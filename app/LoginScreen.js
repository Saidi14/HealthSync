import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Checks if email & password are filled
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting login with:', email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in:', user.uid);
      Alert.alert('Success', 'Logged in successfully!');
      router.push('/mainscreen');

    } catch (error) {
      console.log('Login error:', error.code, error.message);

      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Error', 'No account found with this email. Please register first.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Incorrect password. Try again.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'Invalid email format.');
          break;
        default:
          Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HealthSync Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.signInText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => router.push('/signup')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20, backgroundColor:'#fff' },
  title: { fontSize:28, fontWeight:'bold', textAlign:'center', marginBottom:30 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:12, fontSize:16, marginBottom:20 },
  signInButton: { backgroundColor:'#007AFF', borderRadius:8, padding:15, alignItems:'center', marginBottom:20 },
  signInText: { color:'#fff', fontSize:16, fontWeight:'bold' },
  signUpText: { textAlign:'center', color:'#666', fontSize:14 },
  signUpLink: { color:'#007AFF', fontWeight:'bold' },
});
