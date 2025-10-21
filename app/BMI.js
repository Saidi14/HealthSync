// screens/BMI.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function BMI({ navigation }) {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null); // 'weight' or 'height'
  const [inputValue, setInputValue] = useState('');
  const [userId, setUserId] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return unsubscribe;
  }, []);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Normal';
    if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
    return 'Obese';
  };

  const bmi = calculateBMI();
  const category = getBMICategory(bmi);

  const openModal = (field) => {
    setCurrentField(field);
    setInputValue(field === 'weight' ? weight.toString() : height.toString());
    setModalVisible(true);
  };

  const saveValue = async () => {
    const numericValue = Number(inputValue);
    if (!isNaN(numericValue) && numericValue > 0) {
      let updatedWeight = weight;
      let updatedHeight = height;

      if (currentField === 'weight') updatedWeight = numericValue;
      else if (currentField === 'height') updatedHeight = numericValue;

      // Update local state
      if (currentField === 'weight') setWeight(updatedWeight);
      if (currentField === 'height') setHeight(updatedHeight);

      // Save to Firestore
      if (!userId) {
        Alert.alert('Error', 'No user logged in.');
        setModalVisible(false);
        return;
      }

      try {
        const heightInMeters = updatedHeight / 100;
        const bmiValue = (updatedWeight / (heightInMeters * heightInMeters)).toFixed(1);

        let bmiCategory = 'Unknown';
        if (bmiValue < 18.5) bmiCategory = 'Underweight';
        else if (bmiValue >= 18.5 && bmiValue <= 24.9) bmiCategory = 'Normal';
        else if (bmiValue >= 25 && bmiValue <= 29.9) bmiCategory = 'Overweight';
        else bmiCategory = 'Obese';

        await addDoc(collection(db, 'bmi'), {
          userId,
          weight: updatedWeight,
          height: updatedHeight,
          bmi: Number(bmiValue),
          category: bmiCategory,
          timestamp: new Date(),
        });

        Alert.alert('Success', 'BMI data saved!');
      } catch (error) {
        console.log('❌ Error saving BMI:', error);
        Alert.alert('Error', 'Failed to save BMI. Try again.');
      }
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bmiValue}>{bmi}</Text>
      <Text
        style={[
          styles.bmiCategory,
          bmi >= 18.5 && bmi <= 24.9 && styles.bmiCategoryHighlight,
        ]}
      >
        {category}
      </Text>

      <View style={styles.measurementContainer}>
        {/* Weight */}
        <View style={styles.measurementItem}>
          <Text style={{ fontSize: 24, color: bmi >= 18.5 && bmi <= 24.9 ? '#c187e5' : '#2196F3' }}>
            ⚖️
          </Text>
          <View style={styles.labelValueContainerLeft}>
            <Text style={styles.measurementLabel}>Weight</Text>
            <Text style={styles.measurementValue}>{weight} kg</Text>
          </View>
          <TouchableOpacity style={styles.updateButton} onPress={() => openModal('weight')}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>

        {/* Height */}
        <View style={styles.measurementItem}>
          <Text style={{ fontSize: 24, color: bmi >= 18.5 && bmi <= 24.9 ? '#c187e5' : '#2196F3' }}>
            📏
          </Text>
          <View style={styles.labelValueContainerLeft}>
            <Text style={styles.measurementLabel}>Height</Text>
            <Text style={styles.measurementValue}>{height} cm</Text>
          </View>
          <TouchableOpacity style={styles.updateButton} onPress={() => openModal('height')}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subHeader}>BMI Categories</Text>
      <View style={styles.categoryContainer}>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryText}>Underweight</Text>
          <Text style={styles.categoryRange}>{'< 18.5'}</Text>
        </View>
        <View style={styles.categoryRow}>
          <Text style={[styles.categoryText, bmi >= 18.5 && bmi <= 24.9 && styles.categoryTextHighlight]}>
            Normal
          </Text>
          <Text style={styles.categoryRange}>18.5 - 24.9</Text>
        </View>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryText}>Overweight</Text>
          <Text style={styles.categoryRange}>25 - 29.9</Text>
        </View>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryText}>Obese</Text>
          <Text style={styles.categoryRange}>{'> 30'}</Text>
        </View>
      </View>

      {/* Modal for updating weight/height */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>
              Update {currentField === 'weight' ? 'Weight' : 'Height'}
            </Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveValue}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ textAlign: 'center', color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingBottom: 70 },
  bmiValue: { fontSize: 48, fontWeight: 'bold', marginBottom: 10, color: '#333', textAlign: 'center' },
  bmiCategory: { fontSize: 20, marginBottom: 20, color: '#333', textAlign: 'center' },
  bmiCategoryHighlight: { color: '#c187e5' },
  measurementContainer: { marginBottom: 20 },
  measurementItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 10, padding: 15, marginBottom: 10 },
  labelValueContainerLeft: { marginLeft: 10, justifyContent: 'center' },
  measurementLabel: { fontSize: 16, color: '#333' },
  measurementValue: { fontSize: 16, color: '#333', marginTop: 5 },
  updateButton: { backgroundColor: '#c187e5', borderRadius: 8, paddingVertical: 5, paddingHorizontal: 10, marginLeft: 'auto' },
  updateButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  subHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  categoryContainer: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 15 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  categoryText: { fontSize: 16, color: '#333' },
  categoryTextHighlight: { color: '#c187e5' },
  categoryRange: { fontSize: 16, color: '#333' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  modalInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 15, textAlign: 'center' },
  saveButton: { backgroundColor: '#c187e5', borderRadius: 8, padding: 12, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
