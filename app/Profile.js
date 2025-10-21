// Profile.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const navigation = useNavigation();

  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    dailyCalorieGoal: ''
  });

  // Get logged-in user ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        loadProfile(user.uid);
      } else {
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);

  // Load profile from Firestore
  const loadProfile = async (uid) => {
    try {
      const docRef = doc(db, 'profiles', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.log('Error loading profile:', error);
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  // Save profile to Firestore
  const saveProfile = async () => {
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to save profile.');
      return;
    }

    try {
      await setDoc(doc(db, 'profiles', userId), profile);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.log('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/naqeebahicon.png')}
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={28} color="#c187e5" />
        </TouchableOpacity>
        <Text style={styles.name}>Naqeebah Khan</Text>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.stat}>7</Text>
            <Text style={styles.statLabel}>Walks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.stat}>3</Text>
            <Text style={styles.statLabel}>Marathons</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.stat}>12</Text>
            <Text style={styles.statLabel}>Hikes</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Your Information</Text>

      {/* Editable Profile Fields */}
      {['height', 'weight', 'goal', 'activityLevel', 'dailyCalorieGoal'].map((field) => (
        <View key={field} style={styles.infoItemCard}>
          <Text style={styles.infoLabel}>
            {field === 'dailyCalorieGoal' ? 'Daily Calorie Goal' :
            field.charAt(0).toUpperCase() + field.slice(1)}
          </Text>
          <TextInput
            style={styles.infoValue}
            placeholder={field === 'height' ? 'e.g. 175 cm' :
                        field === 'weight' ? 'e.g. 72 kg' :
                        field === 'goal' ? 'e.g. Lose Weight' :
                        field === 'activityLevel' ? 'e.g. Moderately active' :
                        'e.g. 2200 kcal'}
            value={profile[field]}
            onChangeText={(text) => setProfile({ ...profile, [field]: text })}
          />
        </View>
      ))}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
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
    paddingBottom: 70 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 20, 
    position: 'relative' 
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginBottom: 10 
  },
  settingsIcon: { 
    position: 'absolute', 
    top: 10, 
    right: 0, 
    zIndex: 10, 
    padding: 10 
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 10 
  },
  stats: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%' 
  },
  statItem: { 
    alignItems: 'center' 
  },
  stat: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#c187e5' 
  },
  statLabel: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 4 
  },
  sectionHeader: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 15 
  },
  infoItemCard: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 10 
  },
  infoLabel: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 5 
  },
  infoValue: { 
    fontSize: 16, 
    color: '#333', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5
  },
  saveButton: {
    backgroundColor: '#c187e5',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
