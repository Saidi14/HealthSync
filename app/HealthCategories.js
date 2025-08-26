import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BottomNavBar from '../app/BottomNavBar';

export default function HealthCategories() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Health Categories</Text>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/Calories')}>
          <Ionicons name="flame-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Calorie Intake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/BMI')}>
          <Ionicons name="person-outline" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Body Mass Index (BMI)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/Sugar')}>
          <FontAwesome5 name="cookie" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Sugar Intake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/Macros')}>
          <MaterialCommunityIcons name="chart-bar" size={20} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Macros</Text>
        </TouchableOpacity>
      </View>

      {/* iOS style bottom nav bar */}
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 70 },
  header: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#333' },
  
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 7,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  icon: {
    marginRight: 15,
  },

  cardText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});



