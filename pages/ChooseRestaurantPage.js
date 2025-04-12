import Config from 'react-native-config';
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();

const ChooseRestaurantPage = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [nearestPlace, setNearestPlace] = useState(null);
  const apiKey = Config.GOOGLE_MAPS_API_KEY;

  const getLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const fetchNearestRestaurant = async () => {
    const granted = await getLocationPermission();
    if (!granted) {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    Geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setRegion({ latitude, longitude });

        try {
          const res = await axios.get(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${apiKey}"
          );
          if (res.data.results && res.data.results.length > 0) {
            const topResult = res.data.results[0];
            setNearestPlace(topResult.name);
          } else {
            Alert.alert("No restaurants found nearby.");
          }
        } catch (err) {
          console.error("Failed to fetch nearby places:", err);
        }
      },
      (error) => {
        console.warn(error.message);
        Alert.alert("Error getting location", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Where are you dining?</Text>
        <Text style={styles.subtitle}>
          Search by restaurant name, address, or your current location. We will recommend the best options for you!
        </Text>

        {nearestPlace && (
          <Text style={styles.resultText}>Nearest Restaurant: {nearestPlace}</Text>
        )}

        <View style={styles.placesContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search for restaurants"
            fetchDetails
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            query={{
              key: apiKey,
              language: "en",
              types: "establishment",
              keyword: "restaurant",
            }}
            styles={{
              textInput: styles.searchInput,
              listView: styles.suggestions,
            }}
            enablePoweredByContainer={false}
          />
        </View>
        
        <TouchableOpacity
          style={styles.searchButton}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or take a picture of the menu instead!</Text>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate("CameraPage")}
        >
          <Text style={styles.buttonText}>Open camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
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
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 24,
    color: "#011a59",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 30,
    textAlign: "center",
    color: "#979797",
  },
  searchInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
  },
  suggestions: {
    zIndex: 10,
  },
  placesContainer: {
    width: "100%",
    zIndex: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#2e8ea7",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginTop: "60%",
    width: 305,
    height: 58,
    justifyContent: "center",
    alignItems: "center"
  },
  cameraButton: {
    backgroundColor: "#88becc",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginTop: 10,
    width: 305,
    height: 58,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  orText: {
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    color: "#444",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default ChooseRestaurantPage;