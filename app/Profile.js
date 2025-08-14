// Profile.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // hook

export default function Profile() {
  const navigation = useNavigation(); // get navigation even if prop is missing

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Avatar */}
        <Image
          source={require('../assets/images/naqeebahicon.png')}
          style={styles.avatar}
        />

        {/* Settings Icon */}
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={28} color="#c187e5" />
        </TouchableOpacity>

        {/* Name */}
        <Text style={styles.name}>Naqeebah Khan</Text>

        {/* Stats */}
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

      <View style={styles.infoItemCard}>
        <Text style={styles.infoLabel}>Height</Text>
        <Text style={styles.infoValue}>175 cm</Text>
      </View>

      <View style={styles.infoItemCard}>
        <Text style={styles.infoLabel}>Weight</Text>
        <Text style={styles.infoValue}>72 kg</Text>
      </View>

      <View style={styles.infoItemCard}>
        <Text style={styles.infoLabel}>Goal</Text>
        <Text style={styles.infoValue}></Text>
      </View>

      <View style={styles.infoItemCard}>
        <Text style={styles.infoLabel}>Activity Level</Text>
        <Text style={styles.infoValue}>Moderately active</Text>
      </View>

      <View style={styles.infoItemCard}>
        <Text style={styles.infoLabel}>Daily Calorie Goal</Text>
        <Text style={styles.infoValue}>2200 kcal</Text>
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
    color: '#333' 
  },
});
