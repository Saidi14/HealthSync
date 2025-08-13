import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNavBar from '../app/BottomNavBar';

export default function Calories() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calories</Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Consumed</Text>
            <Text style={styles.summaryValue}>1850</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Remaining</Text>
            <Text style={[styles.summaryValue, styles.remainingValue]}>350</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Goal</Text>
            <Text style={styles.summaryValue}>2200</Text>
          </View>
        </View>
        <Text style={styles.progressText}>84% of daily goal</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subHeader}>Today's Meals</Text>

      <View style={styles.mealItem}>
        <Text style={styles.mealName}>Breakfast</Text>
        <Text style={styles.mealCalories}>520 kcal</Text>
      </View>

      <View style={styles.mealItem}>
        <Text style={styles.mealName}>Lunch</Text>
        <Text style={styles.mealCalories}>680 kcal</Text>
      </View>

      <View style={styles.mealItem}>
        <Text style={styles.mealName}>Dinner</Text>
        <Text style={styles.mealCalories}>450 kcal</Text>
      </View>

      <View style={styles.mealItem}>
        <Text style={styles.mealName}>Snacks</Text>
        <Text style={styles.mealCalories}>200 kcal</Text>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add calories</Text>
      </TouchableOpacity>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingBottom: 70 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  summaryContainer: { marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  remainingValue: { color: '#4CAF50' },
  progressText: { textAlign: 'center', color: '#666', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  subHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  mealItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  mealName: { fontSize: 16, color: '#333' },
  mealCalories: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#007AFF', borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 20 },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

