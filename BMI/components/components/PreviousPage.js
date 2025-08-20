import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PreviousPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Previous Page</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.buttonText}>Go to BMI Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
});