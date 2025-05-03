import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, ActivityIndicator, Alert } from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import NextButton from "../components/NextButton";
import { supabase } from '../utils/supabase';
import MenuButton from "../components/MenuButton";

const SummaryPage = ({ navigation, route }) => {
  const { name, email, dietaryPreference, noGoFoods } = route.params;

  console.log('name', name);
  console.log('email', email);
  console.log('dietaryPreference', dietaryPreference);
  console.log('noGoFoods1', noGoFoods[0]);
  console.log('noGoFoods2', noGoFoods[1]);
  console.log('noGoFoods3', noGoFoods[2]);
  console.log('noGoFoods4', noGoFoods[3]);
  console.log('noGoFoods5', noGoFoods[4]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextPress = () => {
    navigation.navigate('ChooseRestaurant', {
      name,
      email,
      dietaryPreference,
      noGoFoods
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Save user data to Supabase
      const { data, error } = await supabase
        .from('user_info')
        .insert([
          { 
            name: name, 
            email: email, 
            how_do_you_eat: dietaryPreference,
            no_go_1: noGoFoods[0] || null,
            no_go_2: noGoFoods[1] || null,
            no_go_3: noGoFoods[2] || null,
            no_go_4: noGoFoods[3] || null,
            no_go_5: noGoFoods[4] || null,
          }
        ])
        .select();
      
      if (error) {
        console.error('Error saving data:', error);
        Alert.alert('Error', `Failed to save your information: ${error.message}`);
      } else {
        console.log('Data saved successfully:', data);
        Alert.alert(
          'Success!', 
          'Your information has been saved successfully.',
          [{ text: 'OK', onPress: () => navigation.navigate('ChooseRestaurant') }]
        );
      }
    } catch (err) {
      console.error('Submission error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <MenuButton/>
      </View>

      {/* Summary Content */}
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Summary</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <Text style={styles.infoText}>{dietaryPreference}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>No-Go Foods</Text>
          {noGoFoods && noGoFoods.length > 0 ? (
            noGoFoods.map((food, index) => (
              food ? <Text key={index} style={styles.infoText}>• {food}</Text> : null
            ))
          ) : (
            <Text style={styles.infoText}>No items specified</Text>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <NextButton 
            onPress={handleSubmit} 
            onPress={handleNextPress}
            buttonText="Submit" 
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
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
  summaryContainer: {
    width: "85%",
    marginTop: 180,
    maxHeight: 300,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  buttonContainer: {
    position: "absolute",
    marginTop: 100,
    bottom: -20,
    height: 50,
    justifyContent: "center",
  },
});

export default SummaryPage; 