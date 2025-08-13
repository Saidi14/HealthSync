import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function BottomNavBar() {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => router.push('/mainscreen')}>
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/HealthCategories')}>
        <Text>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

