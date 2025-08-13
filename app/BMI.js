import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function BMI({ navigation }) {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BMI Tracking</Text>

      <Text style={styles.bmiValue}>{bmi}</Text>
      <Text style={styles.bmiCategory}>{category}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight.toString()}
          onChangeText={(text) => setWeight(Number(text))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          value={height.toString()}
          onChangeText={(text) => setHeight(Number(text))}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.subHeader}>BMI Categories</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Underweight</Text>
          <Text style={styles.tableCell}>{'< 18.5'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Normal</Text>
          <Text style={styles.tableCell}>18.5 - 24.9</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Overweight</Text>
          <Text style={styles.tableCell}>25 - 29.9</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Obese</Text>
          <Text style={styles.tableCell}>{'> 30'}</Text>
        </View>
      </View>

      <BottomNavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 70,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  bmiCategory: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    fontSize: 16,
    color: '#333',
  },
});