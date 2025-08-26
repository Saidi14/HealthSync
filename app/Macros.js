import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function Macros({ navigation }) {
  const [protein, setProtein] = useState(95);
  const [carbs, setCarbs] = useState(210);
  const [fat, setFat] = useState(62);
  const [modalVisible, setModalVisible] = useState(false);

  const totalMacros = protein + carbs + fat;
  const proteinPerc = (protein / totalMacros) * 100;
  const carbsPerc = (carbs / totalMacros) * 100;
  const fatPerc = (fat / totalMacros) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Macros</Text>

      <View style={styles.summaryCard}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${proteinPerc}%`, backgroundColor: '#2196F3' }]} />
          <View style={[styles.progressBar, { width: `${carbsPerc}%`, backgroundColor: '#c187e5', position: 'absolute', left: `${proteinPerc}%` }]} />
          <View style={[styles.progressBar, { width: `${fatPerc}%`, backgroundColor: '#D4A017', position: 'absolute', left: `${proteinPerc + carbsPerc}%` }]} />
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={[styles.progressText, { color: '#2196F3' }]}>P: {protein}g</Text>
          <Text style={[styles.progressText, { color: '#c187e5' }]}>C: {carbs}g</Text>
          <Text style={[styles.progressText, { color: '#D4A017' }]}>F: {fat}g</Text>
        </View>
      </View>

      <View style={styles.macroSummary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Protein</Text>
          <Text style={styles.summaryValue}>{protein}g</Text>
          <View style={styles.progressBarSmall}>
            <View style={[styles.progressBarFill, { width: `${(protein / 150) * 100}%`, backgroundColor: '#2196F3' }]} />
          </View>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Carbs</Text>
          <Text style={styles.summaryValue}>{carbs}g</Text>
          <View style={styles.progressBarSmall}>
            <View style={[styles.progressBarFill, { width: `${(carbs / 300) * 100}%`, backgroundColor: '#c187e5' }]} />
          </View>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Fat</Text>
          <Text style={styles.summaryValue}>{fat}g</Text>
          <View style={styles.progressBarSmall}>
            <View style={[styles.progressBarFill, { width: `${(fat / 100) * 100}%`, backgroundColor: '#D4A017' }]} />
          </View>
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
            onChangeText={(text) => setProtein(Number(text) || 0)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Carbs (g)</Text>
          <TextInput
            style={styles.input}
            value={carbs.toString()}
            onChangeText={(text) => setCarbs(Number(text) || 0)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Fat (g)</Text>
          <TextInput
            style={styles.input}
            value={fat.toString()}
            onChangeText={(text) => setFat(Number(text) || 0)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add macros</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Enter food / drink name</Text>
            <TextInput
              style={styles.foodInput}
              placeholder="e.g. Macaroni and Cheese"
            />

            <Text style={styles.sectionTitle}>Serving size</Text>
            <View style={styles.servingRow}>
              <TouchableOpacity style={styles.purpleButton}>
                <Text style={styles.buttonText}>Small</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.purpleButton}>
                <Text style={styles.buttonText}>800G</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.purpleButton}>
                <Text style={styles.buttonText}>Large</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Number of servings</Text>
            <View style={styles.servingDisplay}>
              <Text style={styles.servingText}>2</Text>
            </View>

            <View style={styles.keypad}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <TouchableOpacity key={num} style={styles.key}>
                  <Text style={styles.keyText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.calculateButton}>
              <Text style={styles.calculateButtonText}>Calculate macros</Text>
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
  summaryCard: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  progressContainer: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  macroSummary: {
    marginBottom: 20,
  },
  summaryItem: {
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarSmall: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    marginTop: 5,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
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
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
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
    backgroundColor: '#c187e5',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  foodInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  servingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  purpleButton: {
    backgroundColor: '#c187e5',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  servingDisplay: {
    alignItems: 'center',
    marginBottom: 10,
  },
  servingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
  },
  key: {
    width: '30%',
    margin: '1%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#c187e5',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});