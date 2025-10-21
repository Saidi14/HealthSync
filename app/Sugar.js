import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { auth, db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Sugar({ navigation }) {
  const [dailyLimit] = useState(36);
  const [naturalSugars, setNaturalSugars] = useState(12);
  const [addedSugars, setAddedSugars] = useState(16);
  const [modalVisible, setModalVisible] = useState(false);
  const [sugarAmount, setSugarAmount] = useState('');
  const [sugarType, setSugarType] = useState(''); // "natural" or "added"
  const [userId, setUserId] = useState(null);

  const totalSugar = naturalSugars + addedSugars;
  const percentage = Math.min(Math.round((totalSugar / dailyLimit) * 100), 100);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return unsubscribe;
  }, []);

  const handleSaveSugar = async () => {
    if (!sugarAmount || !sugarType) {
      Alert.alert('Error', 'Please enter sugar amount and select type.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'No user logged in.');
      return;
    }

    const sugarValue = Number(sugarAmount);
    if (isNaN(sugarValue) || sugarValue <= 0) {
      Alert.alert('Error', 'Please enter a valid number for sugar.');
      return;
    }

    try {
      await addDoc(collection(db, 'sugar'), {
        userId,
        sugar: sugarValue,
        type: sugarType,
        timestamp: new Date(),
      });

      if (sugarType === 'natural') setNaturalSugars(prev => prev + sugarValue);
      if (sugarType === 'added') setAddedSugars(prev => prev + sugarValue);

      Alert.alert('Success', 'Sugar intake saved!');
      setSugarAmount('');
      setSugarType('');
      setModalVisible(false);
    } catch (error) {
      console.log('❌ Error saving sugar:', error);
      Alert.alert('Error', 'Failed to save sugar. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Daily Sugar</Text>
        <Text style={styles.iconPlaceholder}>🍭</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryValue}>{totalSugar}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.summaryText}>of {dailyLimit}g</Text>
        <Text style={styles.summaryText}>{percentage}% of daily limit</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subHeader}>Sugar Sources</Text>
      <View style={styles.inputContainer}>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.inputLabel}>Natural Sugars</Text>
              <Text style={styles.inputSubLabel}>From fruits & vegetables</Text>
            </View>
            <TextInput
              style={styles.input}
              value={naturalSugars.toString()}
              onChangeText={(text) => setNaturalSugars(Number(text) || 0)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.inputLabel}>Added Sugars</Text>
              <Text style={styles.inputSubLabel}>From processed foods</Text>
            </View>
            <Text style={styles.input}>{addedSugars}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add sugar</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="none">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Enter sugar</Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Sugar in grams"
              keyboardType="numeric"
              value={sugarAmount}
              onChangeText={setSugarAmount}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
              <TouchableOpacity
                style={[styles.typeButton, sugarType === 'natural' && styles.typeButtonSelected]}
                onPress={() => setSugarType('natural')}
              >
                <Text style={styles.typeButtonText}>Natural</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, sugarType === 'added' && styles.typeButtonSelected]}
                onPress={() => setSugarType('added')}
              >
                <Text style={styles.typeButtonText}>Added</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleSaveSugar}
            >
              <Text style={styles.calculateButtonText}>Save sugar</Text>
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

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  iconPlaceholder: {
    fontSize: 24,
    color: '#9C27B0',
  },

  summaryContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },

  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 10,
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#c187e5',
    borderRadius: 10,
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

  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  inputContainer: {
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 60,
    marginLeft: 'auto',
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

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 0,
    marginTop: 15,
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
