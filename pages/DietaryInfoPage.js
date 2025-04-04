import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import NextButton from "../components/NextButton";
import MenuButton from "../components/MenuButton";

const DietaryInfoPage = ({ navigation, route }) => {
  const { name, email } = route.params;
  const [selectedDiet, setSelectedDiet] = useState("");
  const [error, setError] = useState("");

  const dietaryOptions = [
    "Omnivore",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Keto",
    "Paleo",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "Mediterranean"
  ];

  const validateAndNavigate = () => {
    if (!selectedDiet) {
      setError("Please select a dietary preference");
      return;
    }
    
    navigation.navigate("NoGoFoods", { 
      name, 
      email, 
      dietaryPreference: selectedDiet 
    });
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

      {/* Form Content */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>How do you eat?</Text>
        <Text style={styles.subtitle}>Select your dietary preference</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <ScrollView style={styles.optionsContainer}>
          {dietaryOptions.map((diet) => (
            <TouchableOpacity
              key={diet}
              style={[
                styles.optionItem,
                selectedDiet === diet && styles.selectedOption
              ]}
              onPress={() => {
                setSelectedDiet(diet);
                setError("");
              }}
            >
              <Text 
                style={[
                  styles.optionText,
                  selectedDiet === diet && styles.selectedOptionText
                ]}
              >
                {diet}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <NextButton onPress={validateAndNavigate} />
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
  formContainer: {
    width: "85%",
    marginTop: 180,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#666",
  },
  optionsContainer: {
    maxHeight: 400,
  },
  optionItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: "#4a90e2",
    backgroundColor: "#f0f7ff",
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "#4a90e2",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
});

export default DietaryInfoPage; 