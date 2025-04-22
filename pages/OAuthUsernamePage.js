import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import NextButton from "../components/NextButton";

const OAuthUsernamePage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  const handleNext = () => {
    if (username.trim()) {
      // TODO: Store username in user profile
      navigation.navigate('Welcome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Back Button + Logo */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Choose a Username</Text>
        <Text style={styles.subtitle}>This is how other users will see you</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.buttonContainer}>
          <NextButton 
            onPress={handleNext}
            buttonText="Continue"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: 43,
  },
  logoContainer: {
    position: "absolute",
    top: 43,
    left: "50%",
    transform: [{ translateX: -71.5 }],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 160,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
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
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
});

export default OAuthUsernamePage; 