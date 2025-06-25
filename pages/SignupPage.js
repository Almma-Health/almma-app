import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { signup } from '../utils/authenticationUtils';

const SignupPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Currently disabled email verification as verification is not working
  const handleSignup = async () => {
    const { data, error } = await signup(email, password, username);
    if(error) {
      Alert.alert('Unable to Sign Up:', error.message);
      return;
    }
    if(data) {
      navigation.navigate('Welcome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require('../assets/Low_ResLogo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={() => {
            // TODO: Implement Facebook signup
            navigation.navigate('OAuthUsername');
          }}
        >
          <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={() => {
            // TODO: Implement Google signup
            navigation.navigate('OAuthUsername');
          }}
        >
          <Text style={[styles.socialButtonText, styles.googleText]}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, styles.appleButton]}
          onPress={() => {
            // TODO: Implement Apple signup
            navigation.navigate('OAuthUsername');
          }}
        >
          <Text style={styles.socialButtonText}>Sign Up with Apple</Text>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>You are completely safe.</Text>
          <TouchableOpacity>
            <Text style={styles.termsLink}>Read our Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: '60%',
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  socialButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E1E1',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  googleText: {
    color: '#000000',
  },
  termsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  termsText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 5,
  },
  termsLink: {
    color: '#4A90E2',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignupPage; 