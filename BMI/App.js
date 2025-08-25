import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import BMIPage from './components/BMIPage';
import PreviousPage from './components/PreviousPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let iconSize = size;

          if (route.name === 'Profile') {
            iconName = 'person-circle-outline'; // 👤 Profile icon
          } else if (route.name === 'Categories') {
            iconName = 'apps-outline'; // 🔲 Categories icon
          } else if (route.name === 'Home') {
            iconName = 'home-outline'; // 🏠 Home icon
            iconSize = size + 6; // Make Home bigger
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 65, paddingBottom: 8, paddingTop: 5 },
        tabBarLabelStyle: { fontSize: 12 }
      })}
    >
      {/* All tabs point to BMIPage */}
      <Tab.Screen name="Profile" component={BMIPage} />
      <Tab.Screen
        name="Home"
        component={BMIPage}
        options={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }
        }}
      />
      <Tab.Screen name="Categories" component={BMIPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PreviousPage"
          component={PreviousPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
