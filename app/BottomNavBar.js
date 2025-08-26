import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNavBar() {
  const currentRoute = usePathname();

  const tabs = [
    { name: 'Home', route: '/mainscreen', icon: 'home' },
    { name: 'Categories', route: '/HealthCategories', icon: 'grid' },
    { name: 'Profile', route: '/Profile', icon: 'person' },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => router.push(tab.route)}
          >
            <Ionicons
              name={isActive ? tab.icon : `${tab.icon}-outline`}
              size={24}
              color={isActive ? '#C17CEB' : '#8e8e93'}
            />
            <Text style={[styles.navText, isActive && styles.activeText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 2,
  },
  activeText: {
    color: '#C17CEB',
    fontWeight: '500',
  },
});


