import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function BMIPage({ navigation }) {
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('65');
  const [bmi, setBmi] = useState('');
  const [category, setCategory] = useState('');

  const calculateBMI = (newHeight = height, newWeight = weight) => {
    if (!newHeight || !newWeight) return;
    const h = parseFloat(newHeight) / 100;
    const bmiValue = parseFloat(newWeight) / (h * h);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');

    saveBMI(newHeight, newWeight, bmiValue.toFixed(1), category);
  };

  const saveBMI = async (height, weight, bmiValue, category) => {
    try {
      await addDoc(collection(db, "bmiRecords"), {
        height,
        weight,
        bmi: bmiValue,
        category,
        createdAt: serverTimestamp()
      });
      console.log("✅ BMI record saved!");
    } catch (error) {
      console.error("❌ Error saving BMI: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('PreviousPage')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.statusIcons}>
          <Ionicons name="wifi" size={20} color="black" style={{ marginRight: 8 }} />
          <Ionicons name="battery-full" size={20} color="black" />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        <Text style={styles.title}>BMI Tracking</Text>

        {/* Height row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.valueInput}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <Text style={styles.cmText}>cm</Text>
          <TouchableOpacity style={styles.updateBtn} onPress={() => calculateBMI(height, weight)}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Height</Text>

        {/* Weight row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.valueInput}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <Text style={styles.cmText}>kg</Text>
          <TouchableOpacity style={styles.updateBtn} onPress={() => calculateBMI(height, weight)}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Weight</Text>

        {/* BMI Display */}
        {bmi ? (
          <View style={styles.resultBox}>
            <Text style={[styles.bmiValue, { color: categoryColor(category) }]}>{bmi}</Text>
            <Text style={[styles.categoryText, { color: categoryColor(category) }]}>{category}</Text>
          </View>
        ) : null}

        {/* BMI Categories */}
        <View style={styles.chart}>
          <Text style={styles.chartText}><Text style={{ color: '#2196F3' }}>Underweight:</Text> Below 18.5</Text>
          <Text style={styles.chartText}><Text style={{ color: '#4CAF50' }}>Normal:</Text> 18.5 - 24.9</Text>
          <Text style={styles.chartText}><Text style={{ color: '#FF9800' }}>Overweight:</Text> 25 - 29.9</Text>
          <Text style={styles.chartText}><Text style={{ color: '#F44336' }}>Obese:</Text> 30+</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const categoryColor = (category) => {
  switch (category) {
    case 'Underweight': return '#2196F3';
    case 'Normal': return '#4CAF50';
    case 'Overweight': return '#FF9800';
    case 'Obese': return '#F44336';
    default: return '#000';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 20
  },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  valueInput: {
    flex: 1,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4
  },
  cmText: { fontSize: 16, marginHorizontal: 8 },
  updateBtn: { backgroundColor: '#4CAF50', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 6 },
  updateText: { color: '#fff', fontWeight: 'bold' },
  label: { color: '#555', marginBottom: 10 },
  resultBox: { alignItems: 'center', marginVertical: 20 },
  bmiValue: { fontSize: 40, fontWeight: 'bold' },
  categoryText: { fontSize: 20, marginTop: 5 },
  chart: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 },
  chartText: { fontSize: 16, marginBottom: 5 }
});
