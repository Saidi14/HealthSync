import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import BottomNavBar from '../app/BottomNavBar';

export default function Calories() {
  const [modalVisible, setModalVisible] = useState(false);

  const consumed = 1850;
  const goal = 2200;
  const remaining = goal - consumed;
  const progress = consumed / goal;

  const meals = [
    { name: 'Breakfast', calories: 520 },
    { name: 'Lunch', calories: 680 },
    { name: 'Dinner', calories: 450 },
    { name: 'Snacks', calories: 200 },
  ];

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
            <Text style={styles.mealName}>{meal.name}</Text>
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
              <Text style={styles.calculateButtonText}>Calculate calories</Text>
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

      {/* Bottom Navigation */}
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 70,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  summaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
  },

  progressText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
    textAlign: 'right',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 15,
  },

  mealCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mealName: {
    fontWeight: 'bold',
    color: '#111827',
  },

  mealCalories: {
    color: '#6b7280',
  },

  addButton: {
    backgroundColor: '#C17CEB',
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
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



