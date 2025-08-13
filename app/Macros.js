import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function Macros({ navigation }) {
  const [protein, setProtein] = useState(95);
  const [carbs, setCarbs] = useState(210);
  const [fat, setFat] = useState(62);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Macros</Text>

      <View style={styles.macroList}>
        <Text style={styles.macroItem}>P: {protein}g</Text>
        <Text style={styles.macroItem}>C: {carbs}g</Text>
        <Text style={styles.macroItem}>F: {fat}g</Text>
      </View>

      <View style={styles.macroSummary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Protein</Text>
          <Text style={styles.summaryValue}>{protein}g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Carbs</Text>
          <Text style={styles.summaryValue}>{carbs}g</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Fat</Text>
          <Text style={styles.summaryValue}>{fat}g</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subHeader}>Recommended Split</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Protein</Text>
          <Text style={styles.tableCell}>25-35%</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Carbohydrates</Text>
          <Text style={styles.tableCell}>45-65%</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Fat</Text>
          <Text style={styles.tableCell}>20-35%</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Protein (g)</Text>
          <TextInput
            style={styles.input}
            value={protein.toString()}
            onChangeText={(text) => setProtein(Number(text))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Carbs (g)</Text>
          <TextInput
            style={styles.input}
            value={carbs.toString()}
            onChangeText={(text) => setCarbs(Number(text))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Fat (g)</Text>
          <TextInput
            style={styles.input}
            value={fat.toString()}
            onChangeText={(text) => setFat(Number(text))}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add macros</Text>
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
  macroList: {
    marginBottom: 15,
  },
  macroItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  macroSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 20,
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputItem: {
    flex: 1,
    marginHorizontal: 5,
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