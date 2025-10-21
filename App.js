import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './app/LoginScreen';
import MainScreen from './app/mainscreen';
import HealthCategories from './app/HealthCategories';
import Profile from './app/Profile';
import Settings from './app/Settings';
import Sugar from './app/Sugar';
import Calories from './app/Calories';
import Macros from './app/Macros';
import BMI from './app/BMI';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="mainscreen" component={MainScreen} />
        <Stack.Screen name="HealthCategories" component={HealthCategories} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Sugar" component={Sugar} />
        <Stack.Screen name="Calories" component={Calories} />
        <Stack.Screen name="Macros" component={Macros} />
        <Stack.Screen name="BMI" component={BMI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


