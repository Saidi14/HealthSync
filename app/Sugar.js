import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function Sugar({ navigation }) {
  const [dailyLimit] = useState(36);
  const [naturalSugars, setNaturalSugars] = useState(12);
  const [addedSugars, setAddedSugars] = useState(16);

  const totalSugar = naturalSugars + addedSugars;
  const percentage = Math.round((totalSugar / dailyLimit) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sugar Intake</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.subHeader}>Daily Sugar</Text>
        <Text style={styles.summaryValue}>{totalSugar}</Text>
        <Text style={styles.summaryText}>of {dailyLimit}g</Text>
        <Text style={styles.summaryText}>{percentage}% of daily limit</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subHeader}>Sugar Sources</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Natural Sugars</Text>
          <Text style={styles.inputSubLabel}>From fruits & vegetables</Text>
          <TextInput
            style={styles.input}
            value={naturalSugars.toString()}
            onChangeText={(text) => setNaturalSugars(Number(text))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Added Sugars</Text>
          <Text style={styles.inputSubLabel}>From processed foods</Text>
          <TextInput
            style={styles.input}
            value={addedSugars.toString()}
            onChangeText={(text) => setAddedSugars(Number(text))}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add sugar</Text>
      </TouchableOpacity>

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
  summaryContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputItem: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  inputSubLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});