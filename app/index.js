import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'react-native';





export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HealthSync</Text>

      <Image
        source={require('../assets/images/runner.jpg')}
        style={styles.image}
/>

      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.sectionTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity style={styles.checkbox} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/mainscreen')}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
        
        <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Do not have an account? </Text>
        <TouchableOpacity 
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
        
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or With</Text>
          <View style={styles.dividerLine} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#333',
  },
  signInButton: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  signUpLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#666',
  },

  image: {
  width: 200,
  height: 200,
  alignSelf: 'center',
  marginBottom: 30,
},

});