// screens/MainScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import BottomNavBar from './BottomNavBar';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export default function MainScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // --- States ---
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [calories, setCalories] = useState({ consumed: 0, goal: 2200 });
  const [sugar, setSugar] = useState({ natural: 0, added: 0 });
  const [totalSugar, setTotalSugar] = useState(0);
  const [bmi, setBmi] = useState(null);

  // --- Auth ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else {
        Alert.alert('Not logged in', 'Please sign in first!');
        router.replace('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- Fetch Today’s Data ---
  useEffect(() => {
    if (!user) return;
    const today = new Date();

    // --- Meals / Calories ---
    const mealsRef = collection(db, 'meals');
    const unsubscribeMeals = onSnapshot(mealsRef, (snapshot) => {
      const totalCalories = snapshot.docs.reduce((sum, doc) => {
        const data = doc.data();
        const ts = data.timestamp?.toDate ? data.timestamp.toDate() : new Date();
        if (
          ts.getDate() === today.getDate() &&
          ts.getMonth() === today.getMonth() &&
          ts.getFullYear() === today.getFullYear() &&
          data.userId === user.uid
        ) {
          return sum + (Number(data.calories) || 0);
        }
        return sum;
      }, 0);
      setCalories({ consumed: totalCalories, goal: 2200 });
    });

    // --- Macros ---
    const macrosRef = collection(db, 'macros');
    const unsubscribeMacros = onSnapshot(macrosRef, (snapshot) => {
      const totals = snapshot.docs.reduce(
        (sum, doc) => {
          const data = doc.data();
          const ts = data.timestamp?.toDate ? data.timestamp.toDate() : new Date();
          if (
            ts.getDate() === today.getDate() &&
            ts.getMonth() === today.getMonth() &&
            ts.getFullYear() === today.getFullYear() &&
            data.userId === user.uid
          ) {
            sum.protein += Number(data.protein) || 0;
            sum.carbs += Number(data.carbs) || 0;
            sum.fat += Number(data.fat) || 0;
          }
          return sum;
        },
        { protein: 0, carbs: 0, fat: 0 }
      );
      setMacros(totals);
    });

    // --- Sugar ---
    const sugarRef = collection(db, 'sugar');
    const unsubscribeSugar = onSnapshot(sugarRef, (snapshot) => {
      const totals = snapshot.docs.reduce(
        (sum, doc) => {
          const data = doc.data();
          const ts = data.timestamp?.toDate ? data.timestamp.toDate() : new Date();
          if (
            ts.getDate() === today.getDate() &&
            ts.getMonth() === today.getMonth() &&
            ts.getFullYear() === today.getFullYear() &&
            data.userId === user.uid
          ) {
            if (data.type === 'natural') sum.natural += Number(data.sugar) || 0;
            if (data.type === 'added') sum.added += Number(data.sugar) || 0;
          }
          return sum;
        },
        { natural: 0, added: 0 }
      );
      setSugar(totals);
      setTotalSugar(totals.natural + totals.added);
    });

    // --- BMI ---
    const bmiRef = collection(db, 'bmi');
    const q = query(bmiRef, where('userId', '==', user.uid));
    const unsubscribeBMI = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // get the latest BMI entry
        const latest = snapshot.docs.reduce((a, b) => {
          return a.data().timestamp.toDate() > b.data().timestamp.toDate() ? a : b;
        });
        setBmi(latest.data().bmi);
      } else {
        setBmi(null);
      }
    });

    return () => {
      unsubscribeMeals();
      unsubscribeMacros();
      unsubscribeSugar();
      unsubscribeBMI();
    };
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) return null;

  const remainingCalories = calories.goal - calories.consumed;
  const caloriesProgress = calories.consumed / calories.goal;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.greetingText}>Welcome👋</Text>
          <Text style={styles.subText}>
            Track your daily nutrition and wellness all in one place
          </Text>
        </View>

        {/* Health Overview Cards */}
        <Text style={styles.sectionTitle}>Your Health Overview</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#e6d5f7' }]}>
            <Ionicons name="body-outline" size={34} color="#6c3bb0" />
            <Text style={styles.statLabel}>BMI</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
              {bmi ? bmi : '--'}
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#d5e8f7' }]}>
            <MaterialCommunityIcons name="food-apple-outline" size={34} color="#0c65a7" />
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
              {calories.consumed} / {calories.goal} kcal
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#f7d5d5' }]}>
            <FontAwesome5 name="candy-cane" size={30} color="#d43f3f" />
            <Text style={styles.statLabel}>Sugar</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
              {totalSugar} g
            </Text>
          </View>
        </View>

        {/* Macronutrient Cards */}
        <Text style={styles.sectionTitle}>Macronutrients</Text>
        <View style={styles.macrosRow}>
          <View style={styles.macroCard}>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2196F3' }}>{macros.protein}g</Text>
          </View>
          <View style={styles.macroCard}>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#c187e5' }}>{macros.carbs}g</Text>
          </View>
          <View style={styles.macroCard}>
            <Text style={styles.macroLabel}>Fat</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#D4A017' }}>{macros.fat}g</Text>
          </View>
        </View>

        {/* Motivational Card */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            🌟 Keep adding your meals, macros, and BMI to see your progress in real time!
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fc' },
  headerContainer: {
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#c187e5',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
    shadowColor: '#6c3bb0',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'sans-serif-medium',
  },
  subText: {
    fontSize: 16,
    color: '#f1f2f6',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 25,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 18,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  statLabel: { color: '#2d3436', fontWeight: '600', marginTop: 8 },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  macroCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 3,
  },
  macroLabel: { fontSize: 15, color: '#636e72', fontWeight: '600' },
  motivationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  motivationText: { textAlign: 'center', fontSize: 16, color: '#2c3e50' },
});
