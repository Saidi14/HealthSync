 import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('mainscreen');
  };
  
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.time}>14:55</Text>
      
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.title}>HealthSync</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={true}
        />
      </View>
      
      <View style={styles.rememberContainer}>
        <TouchableOpacity style={styles.checkbox}>
          {/* You would add a checkbox component here */}
        </TouchableOpacity>
        <Text style={styles.rememberText}>Remember me</Text>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
      
      <Text style={styles.signUpText}>
        Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
      </Text>
      
      <Text style={styles.orText}>Or With</Text>
      
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          {/* Add Google icon here */}
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          {/* Add Apple icon here */}
          <Text style={styles.socialText}>Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  time: {
    textAlign: 'right',
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  welcome: {
    fontSize: 24,
    color: '#000',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: '#000',
    marginRight: 'auto',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007AFF', // iOS blue color
  },
  signInButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  signUpLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    marginLeft: 8,
  },
});

export default LoginPage;