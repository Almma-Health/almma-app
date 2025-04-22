import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";

const getLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
};

const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function ChooseRestaurant() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { name, email, dietaryPreference, noGoFoods } = params;

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.warn("Google Maps API key not found. Add EXPO_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.");
  }

  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [id, setId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const getLocationAndId = async () => {
      try {
        const granted = await getLocationPermission();
        if (!granted) {
          Alert.alert("Permission Denied", "Location permission is required.");
          return;
        }

        const generatedId = generateId();
        setId(generatedId);

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        console.log("Location obtained:", currentLocation.coords);
      } catch (err) {
        console.error("Error initializing location and ID:", err);
      }
    };
    getLocationAndId();
  }, []);

  const handleNextPress = () => {
    if (!selectedPlace) {
      Alert.alert("Please select a restaurant", "Search and select a restaurant to continue.");
      return;
    }

    // Mock menu items data - in a real app this would come from your backend
    const mockMenuItems = [
      { 
        name: "Salad with Sauteed Vegetables",
        sustainability: "High sustainability",
        sustainabilityColor: "#4CAF50"
      },
      { 
        name: "Chicken Burrito Salad",
        sustainability: "Medium sustainability",
        sustainabilityColor: "#FFC107"
      },
      { 
        name: "Carnitas Burrito Bowl (no rice)",
        sustainability: "Low sustainability",
        sustainabilityColor: "#F44336"
      }
    ];

    router.push({
      pathname: '/restaurant-review',
      params: {
        restaurant: {
          name: selectedPlace.name,
          address: selectedPlace.formatted_address,
          placeId: selectedPlace.place_id
        },
        menuItems: mockMenuItems,
        userPreferences: {
          name,
          email,
          dietaryPreference,
          noGoFoods
        }
      }
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (page) => {
    setMenuVisible(false);
    router.push(page);
  };

  const menuOptions = [
    { id: 'profile', title: 'My Profile', icon: 'person-outline', page: '/profile' },
    { id: 'security', title: 'Security Settings', icon: 'shield-outline', page: '/security' },
    { id: 'reviews', title: 'Restaurant Reviews', icon: 'restaurant-outline', page: '/reviews' },
    { id: 'help', title: 'Help & Contact', icon: 'help-circle-outline', page: '/help' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton onPress={toggleMenu} />
      </View>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#444" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={menuOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigateTo(item.page)}
                >
                  <Ionicons name={item.icon} size={24} color="#444" style={styles.menuIcon} />
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.menuList}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Where are you dining?</Text>
        <Text style={styles.subtitle}>
          Search by restaurant name, address, or your current location. We will recommend the best options for you!
        </Text>

        <View style={styles.placesContainer}>
        {location && (
          <GooglePlacesAutocomplete
            placeholder="Search for restaurants"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log("Selected place:", details?.name, details?.formatted_address);
              setSelectedPlace(details);
            }}
            query={{
              key: apiKey,
              language: "en",
              location: `${location.latitude},${location.longitude}`,
              rankby: "distance",
              keyword: "restaurant",
            }}            
            onFail={(error) => {
              console.error("GooglePlacesAutocomplete error:", error);
            }}
            styles={{
              textInput: styles.searchInput,
              listView: styles.suggestions,
            }}
            enablePoweredByContainer={false}
            debounce={200}
          />
        )}
         {selectedPlace && (
          <View style={styles.resultCard}>
            <Text style={styles.placeName}>{selectedPlace.name}</Text>
            <Text style={styles.placeAddress}>{selectedPlace.formatted_address}</Text>
          </View>
        )}
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNextPress}>
          <Text style={styles.buttonText}>Let's go!</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or take a picture of the menu instead!</Text>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => router.push('/camera')}
        >
          <Text style={styles.buttonText}>Open camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... existing styles from ChooseRestaurantPage.js ...
}); 