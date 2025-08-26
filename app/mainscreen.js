import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to HealthSync Dashboard!</Text>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', paddingBottom: 60 },
  text: { fontSize: 20, fontWeight: 'bold' },
});


