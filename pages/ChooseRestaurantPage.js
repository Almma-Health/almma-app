import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";
import axios from 'axios';
import { createMockCompatibilityRatings } from "../utils/foodCompatibilityRater";

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

const ChooseRestaurantPage = ({ navigation, route }) => {
  const { name, email, dietaryPreference, noGoFoods } = route.params;
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [mapVisible, setMapVisible] = useState(false);
  const [mapMarker, setMapMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [id, setId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantMarkers, setRestaurantMarkers] = useState([]);
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

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = () => {
    setIsLoading(false);
    setRestaurants([
      { id: 1, name: "Green Garden", cuisine: "Vegetarian", rating: 4.5 },
      { id: 2, name: "Pasta Palace", cuisine: "Italian", rating: 4.2 },
      { id: 3, name: "Sushi Supreme", cuisine: "Japanese", rating: 4.7 },
    ]);
  };

  const handleNextPress = () => {
    if (!selectedPlace) {
      Alert.alert("Please select a restaurant", "Search and select a restaurant to continue.");
      return;
    }

    // Basic menu items
    const baseMenuItems = [
      { name: "Salad with Sauteed Vegetables" },
      { name: "Chicken Burrito Salad" },
      { name: "Carnitas Burrito Bowl (no rice)" },
      { name: "Bean and Cheese Burrito" },
      { name: "Grilled Vegetable Tacos" }
    ];

    // User preferences from the route params
    const userPreferences = {
      name,
      dietaryPreference,
      noGoFoods: Array.isArray(noGoFoods) 
        ? noGoFoods 
        : noGoFoods.split(',').filter(item => item && item.trim().length > 0)
    };

    // Generate compatibility ratings for menu items
    const ratedMenuItems = createMockCompatibilityRatings(
      userPreferences,
      baseMenuItems
    );

    navigation.navigate('RestaurantMenu', {
      restaurant: {
        name: selectedPlace.name,
        address: selectedPlace.formatted_address,
        placeId: selectedPlace.place_id
      },
      menuItems: ratedMenuItems,
      userPreferences
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (page) => {
    setMenuVisible(false);
    navigation.navigate(page);
  };

  const menuOptions = [
    { id: 'profile', title: 'My Profile', icon: 'person-outline', page: 'UserProfile' },
    { id: 'security', title: 'Security Settings', icon: 'shield-outline', page: 'Security' },
    { id: 'reviews', title: 'Restaurant Reviews', icon: 'restaurant-outline', page: 'RestaurantReviews' },
    { id: 'help', title: 'Help & Contact', icon: 'help-circle-outline', page: 'HelpContact' },
  ];

  const fetchPlaceDetails = async (latitude, longitude) => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${latitude},${longitude}`,
          radius: 1000, // in meters
          type: 'restaurant',
          key: apiKey,
        },
      });
  
      if (response.data.results) {
        setRestaurantMarkers(response.data.results);
      }
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMap = () => {
    setMapVisible(true);
    if (location) {
      fetchNearbyRestaurants(location.latitude, location.longitude);
    }
  };

  const demoHandler = () => {
    // Mock restaurant data
    const mockRestaurant = {
      name: "Chipotle",
      address: "123 Demo Street, San Francisco, CA 94105",
      placeId: "demo-place-id"
    };

    // Basic menu items
    const baseMenuItems = [
      { name: "Salad with Sauteed Vegetables" },
      { name: "Chicken Burrito Salad" },
      { name: "Carnitas Burrito Bowl (no rice)" },
      { name: "Bean and Cheese Burrito" },
      { name: "Grilled Vegetable Tacos" }
    ];

    // User preferences
    const userPreferences = {
      name,
      dietaryPreference,
      noGoFoods: Array.isArray(noGoFoods) 
        ? noGoFoods 
        : noGoFoods.split(',').filter(item => item && item.trim().length > 0)
    };

    console.log("User preferences for rating:", userPreferences);

    // Generate compatibility ratings for menu items
    const ratedMenuItems = createMockCompatibilityRatings(
      userPreferences,
      baseMenuItems
    );

    console.log("Rated menu items:", ratedMenuItems);


    console.log("Navigating to RestaurantMenu");
    navigation.navigate('RestaurantMenu', {
      restaurant: mockRestaurant,
      menuItems: ratedMenuItems,
      userPreferences
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton onPress={() => setMenuVisible(!menuVisible)} />
      </View>

      {/* Map Modal */}
      <Modal visible={mapVisible} animationType="slide" onRequestClose={() => setMapVisible(false)}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: '#eee' }}
            onPress={() => setMapVisible(false)}
          >
            <Text style={styles.closeMapText}>Close Map</Text>
          </TouchableOpacity>

          {location && (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {restaurantMarkers.map((place) => (
                <Marker
                  key={place.place_id}
                  coordinate={{
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                  }}
                  title={place.name}
                  description={place.vicinity}
                  onPress={() => {
                    setSelectedPlace({
                      name: place.name,
                      formatted_address: place.vicinity,
                      place_id: place.place_id,
                    });
                    setMapVisible(false);
                  }}
                />
              ))}
            </MapView>
          )}

        </View>
      </Modal>

      {/* Form and Search */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Where are you dining?</Text>
        <Text style={styles.subtitle}>
          Search by restaurant name, address, or your current location. We will recommend the best options for you!
        </Text>

        <View style={styles.placesAndMapButtonContainer}>
          {location && (
            <>
              <View style={styles.searchBarWrapper}>
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
              </View>

              <TouchableOpacity
                style={styles.mapButtonSquare}
                onPress={openMap}
              >
                <Ionicons name="map-outline" size={24} color="#011a59" />
              </TouchableOpacity>
            </>
          )}
          {selectedPlace && (
            <View style={styles.resultCard}>
              <Text style={styles.placeName}>{selectedPlace.name}</Text>
              <Text style={styles.placeAddress}>{selectedPlace.formatted_address}</Text>
            </View>
          )}
        </View>

        {/* Navigation Buttons */}
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => {
            if (!selectedPlace) {
              Alert.alert("Please select a restaurant");
              return;
            }

            const mockMenuItems = [
              { name: "Salad with Sauteed Vegetables", sustainability: "High sustainability", sustainabilityColor: "#4CAF50" },
              { name: "Chicken Burrito Salad", sustainability: "Medium sustainability", sustainabilityColor: "#FFC107" },
              { name: "Carnitas Burrito Bowl (no rice)", sustainability: "Low sustainability", sustainabilityColor: "#F44336" },
            ];

            navigation.navigate('RestaurantMenu', {
              restaurant: {
                name: selectedPlace.name,
                address: selectedPlace.formatted_address,
                placeId: selectedPlace.place_id
              },
              menuItems: mockMenuItems,
              userPreferences: { name, email, dietaryPreference, noGoFoods },
            });
          }}
        >
          <Text style={styles.buttonText}>Let's go!</Text>
        </TouchableOpacity>

        {/* Camera Option */}
        <Text style={styles.orText}>Or take a picture of the menu instead!</Text>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate("CameraPage")}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>

        {/* Demo Button */}
        <TouchableOpacity
          style={styles.demoButton}
          onPress={demoHandler}
        >
          <Text style={styles.demoButtonText}>Demo Mode (LangChain Rating)</Text>
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
  placesAndMapButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "30%",
    marginBottom: 30,
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
  searchBarWrapper: {
    flex: 1,
    marginRight: 40,
    width: "90%"
  },
  searchInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginRight: 20,
    fontSize: 16,
    height: 48,
    width: 500,
    backgroundColor: "#fff",
  },
  closeMapText: {
    marginTop: 60,
    marginBottom: 10,
    color: '#007AFF',
    fontSize: 16,
  },
  suggestions: {
    zIndex: 10,
  },
  placesContainer: {
    width: "85%",
    paddingLeft: -20,
    paddingRight: 80,
    zIndex: 10,
    padding: 10,
    borderRadius: 8,
    height: "30%",
  },
  mapButtonSquare: {
    position: "absolute",
    top: 0,
    left: 270,
    width: 50,
    height: 50,
    backgroundColor: "#c4dce4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  resultCard: {
    width: "100%",
    backgroundColor: "#f4f4f4",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    top: -50,
  },
  placeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#011a59",
  },
  placeAddress: {
    fontSize: 14,
    color: "#666",
  },
  nextButton: {
    backgroundColor: "#2e8ea7",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 24,
    width: 305,
    height: 58,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    backgroundColor: "#88becc",
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 24,
    width: 305,
    height: 58,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  orText: {
    color: "#979797",
    fontSize: 20,
    marginVertical: 5,
    textAlign: "center",
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  menuContainer: {
    width: 300,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: '100%',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuList: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 150,
  },
  restaurantList: {
    paddingBottom: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  demoButton: {
    backgroundColor: '#88becc33',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#88becc',
  },
  demoButtonText: {
    color: '#2e8ea7',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ChooseRestaurantPage;