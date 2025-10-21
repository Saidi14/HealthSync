import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import BottomNavBar from '../app/BottomNavBar';
import { auth, db } from '../firebase/firebase'; 
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default function Calories() {
  const [modalVisible, setModalVisible] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [servings, setServings] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const goal = 2200;

  // Load meals from Firestore for this user
  const fetchMeals = async () => {
    if (!auth.currentUser) return;
    try {
      const q = query(
        collection(db, 'meals'),
        where('userId', '==', auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const userMeals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMeals(userMeals);
    } catch (error) {
      console.log('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const consumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const remaining = goal - consumed;
  const progress = consumed / goal;

  const handleSaveMeal = async () => {
    if (!foodName || !servings) {
      Alert.alert('Error', 'Please enter both food name and servings.');
      return;
    }

    const caloriesPerServing = 100; 
    const totalCalories = parseFloat(servings) * caloriesPerServing;

    const newMeal = {
      name: foodName,
      servings: parseFloat(servings),
      calories: totalCalories,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await addDoc(collection(db, 'meals'), newMeal);
      setMeals([...meals, newMeal]);
      setFoodName('');
      setServings('');
      setModalVisible(false);
      setLoading(false);
      Alert.alert('Success', 'Meal added!');
    } catch (error) {
      console.log('Error saving meal:', error);
      Alert.alert('Error', 'Could not save meal.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Calories</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Consumed</Text>
              <Text style={styles.summaryValue}>{consumed}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Remaining</Text>
              <Text style={styles.summaryValue}>{remaining}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Goal</Text>
              <Text style={styles.summaryValue}>{goal}</Text>
            </View>
          </View>

          <ProgressBar
            progress={progress}
            color="#C17CEB"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}% of daily goal
          </Text>
        </View>

        {/* Meals */}
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <Text style={styles.mealName}>{meal.name} ({meal.servings} servings)</Text>
            <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
          </View>
        ))}

        {/* Add Calories Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add calories</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Popup Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Enter food / drink details</Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Enter food / drink name"
              value={foodName}
              onChangeText={setFoodName}
            />

            <TextInput
              style={styles.foodInput}
              placeholder="Enter number of servings"
              keyboardType="numeric"
              value={servings}
              onChangeText={setServings}
            />

            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleSaveMeal}
              disabled={loading}
            >
              <Text style={styles.calculateButtonText}>
                {loading ? 'Saving...' : 'Save calories'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ textAlign: 'center', color: 'red' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 70 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, justifyContent: 'space-between' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  summaryCard: { backgroundColor: '#fff', margin: 15, padding: 15, borderRadius: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryLabel: { fontSize: 14, color: '#6b7280' },
  summaryValue: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  progressBar: { height: 10, borderRadius: 5, backgroundColor: '#E5E7EB' },
  progressText: { fontSize: 12, color: '#6b7280', marginTop: 5, textAlign: 'right' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 15 },
  mealCard: { backgroundColor: '#fff', marginHorizontal: 15, marginVertical: 5, padding: 15, borderRadius: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, flexDirection: 'row', justifyContent: 'space-between' },
  mealName: { fontWeight: 'bold', color: '#111827' },
  mealCalories: { color: '#6b7280' },
  addButton: { backgroundColor: '#C17CEB', marginHorizontal: 15, marginVertical: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '80%', maxHeight: '80%' },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  foodInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 15 },
  calculateButton: { backgroundColor: '#c187e5', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 5 },
  calculateButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
