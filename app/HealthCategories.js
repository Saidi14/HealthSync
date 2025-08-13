import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function HealthCategories() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Categories</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Calories')}>
        <Text>Calorie Intake</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Sugar')}>
        <Text>Sugar Intake</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Macros')}>
        <Text>Macros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/BMI')}>
        <Text>BMI Calculator</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  header: { fontSize: 24, marginBottom: 20 },
  button: {
    padding: 15,
    marginVertical: 7,
    backgroundColor: '#eee',
    borderRadius: 6,
    width: '80%',
    alignItems: 'center',
  },
});


