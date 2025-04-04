import React, { useState } from "react";
import { 
  View, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import NextButton from "../components/NextButton";
import MenuButton from "../components/MenuButton";

const NoGoFoodsPage = ({ navigation, route }) => {
  const { name, email, dietaryPreference } = route.params;
  const [foodItem, setFoodItem] = useState("");
  const [noGoFoods, setNoGoFoods] = useState([]);
  const [error, setError] = useState("");

  const addFoodItem = () => {
    if (!foodItem.trim()) {
      setError("Please enter a food item");
      return;
    }
    
    if (noGoFoods.length >= 5) {
      setError("Maximum 5 items allowed");
      return;
    }
    
    if (noGoFoods.includes(foodItem.trim())) {
      setError("This item is already in your list");
      return;
    }
    
    setNoGoFoods([...noGoFoods, foodItem.trim()]);
    setFoodItem("");
    setError("");
  };

  const removeFoodItem = (index) => {
    const updatedList = [...noGoFoods];
    updatedList.splice(index, 1);
    setNoGoFoods(updatedList);
  };

  const validateAndNavigate = () => {
    navigation.navigate("Summary", {
      name,
      email,
      dietaryPreference,
      noGoFoods
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
        <Text style={styles.title}>No-Go Foods</Text>
        <Text style={styles.subtitle}>Add up to 5 foods you don't eat</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={foodItem}
            onChangeText={setFoodItem}
            placeholder="Enter a food item"
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={addFoodItem}
            disabled={noGoFoods.length >= 5}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Text style={styles.listTitle}>
          Your No-Go Foods ({noGoFoods.length}/5)
        </Text>
        
        {noGoFoods.length === 0 ? (
          <Text style={styles.emptyListText}>No items added yet</Text>
        ) : (
          <FlatList
            data={noGoFoods}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => removeFoodItem(index)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={24} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            )}
            style={styles.list}
          />
        )}
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <NextButton 
          onPress={validateAndNavigate} 
          buttonText="Review Summary" 
        />
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
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4a90e2",
    borderRadius: 8,
    padding: 12,
    marginLeft: 10,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    maxHeight: 250,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    padding: 5,
  },
  emptyListText: {
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
});

export default NoGoFoodsPage; 