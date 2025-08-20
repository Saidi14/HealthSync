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
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let iconSize = size;

          if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Categories') iconName = 'grid';
          else if (route.name === 'Home') {
            iconName = 'home';
            iconSize = size + 6; // Make Home bigger
          }

          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 65, paddingBottom: 8, paddingTop: 5 }
      })}
    >
      {/* Left tab */}
      <Tab.Screen
        name="Profile"
        component={BMIPage}
        options={{ headerShown: false }}
      />

      {/* Middle main tab */}
      <Tab.Screen
        name="Home"
        component={BMIPage}
        options={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }
        }}
      />

      {/* Right tab */}
      <Tab.Screen
        name="Categories"
        component={BMIPage}
        options={{ headerShown: false }}
      />
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