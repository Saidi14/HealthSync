import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Animated, Alert } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Macros({ navigation }) {
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [userId, setUserId] = useState(null);
  const [macrosList, setMacrosList] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return unsubscribe;
  }, []);

  // progress bar
  const AnimatedBar = ({ percentage, color }) => {
    const widthAnim = new Animated.Value(0);
    useEffect(() => {
      Animated.timing(widthAnim, {
        toValue: percentage,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }, [percentage]);

    return (
      <Animated.View
        style={[
          styles.progressBarFill,
          { width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }), backgroundColor: color },
        ]}
      />
    );
  };

  const addMacrosToDB = async () => {
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to add macros.');
      return;
    }
    if (!protein || !carbs || !fat) {
      Alert.alert('Error', 'Please enter all macro values.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'macros'), {
        userId,
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        timestamp: new Date(),
      });

      // Create new entry for list
      const newEntry = {
        id: docRef.id,
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
      };

      setMacrosList(prev => [newEntry, ...prev]);

      // Clear inputs
      setProtein('');
      setCarbs('');
      setFat('');
    } catch (error) {
      console.log('Error saving macros:', error);
      Alert.alert('Error', 'Failed to save macros. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Macros</Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Protein (g)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 95"
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Carbs (g)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 210"
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Fat (g)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 62"
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addMacrosToDB}>
        <Text style={styles.addButtonText}>Add Macros</Text>
      </TouchableOpacity>

      {/* List of macros entries */}
      <FlatList
        data={macrosList}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => {
          const total = item.protein + item.carbs + item.fat;
          const proteinPerc = (item.protein / total) * 100;
          const carbsPerc = (item.carbs / total) * 100;
          const fatPerc = (item.fat / total) * 100;

          return (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryHeader}>Macros Entry</Text>
              <View style={styles.progressContainer}>
                <AnimatedBar percentage={proteinPerc} color="#2196F3" />
                <AnimatedBar percentage={carbsPerc} color="#c187e5" />
                <AnimatedBar percentage={fatPerc} color="#D4A017" />
              </View>
              <View style={styles.progressTextContainer}>
                <Text style={[styles.progressText, { color: '#2196F3' }]}>P: {item.protein}g</Text>
                <Text style={[styles.progressText, { color: '#c187e5' }]}>C: {item.carbs}g</Text>
                <Text style={[styles.progressText, { color: '#D4A017' }]}>F: {item.fat}g</Text>
              </View>
            </View>
          );
        }}
      />

      <BottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingBottom: 70 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  inputContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  inputItem: { flex: 1, marginHorizontal: 5 },
  inputLabel: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 4, fontSize: 16 },
  addButton: { backgroundColor: '#c187e5', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  summaryCard: { backgroundColor: '#fff', marginTop: 10, padding: 15, borderRadius: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  summaryHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  progressContainer: { height: 10, borderRadius: 5, backgroundColor: '#E5E7EB', marginBottom: 10, overflow: 'hidden', flexDirection: 'row' },
  progressBarFill: { height: '100%', borderRadius: 5 },
  progressTextContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 12, color: '#6b7280' },
});
