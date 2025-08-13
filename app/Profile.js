import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from '../app/BottomNavBar';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', paddingBottom: 60 },
  text: { fontSize: 24, fontWeight: 'bold' },
});
