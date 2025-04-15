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

const ChooseRestaurantPage = ({ navigation, route }) => {
  const { name, email, dietaryPreference, noGoFoods } = route.params;

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

  useEffect(() => {
    // Load restaurants data
    // This is a placeholder for your actual data loading logic
    fetchRestaurants();
  }, []);

  const fetchRestaurants = () => {
    // Placeholder for API call
    setIsLoading(false);
    // Mock data
    setRestaurants([
      { id: 1, name: "Green Garden", cuisine: "Vegetarian", rating: 4.5 },
      { id: 2, name: "Pasta Palace", cuisine: "Italian", rating: 4.2 },
      { id: 3, name: "Sushi Supreme", cuisine: "Japanese", rating: 4.7 },
    ]);
  };

  const handleNextPress = () => {
    navigation.navigate('MenuItems', {
      name,
      email,
      dietaryPreference,
      noGoFoods,
      selectedPlace
    });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (page) => {
    setMenuVisible(false);
    navigation.navigate(page);
  };

  const renderMenuOption = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigateTo(item.page)}
    >
      <Ionicons name={item.icon} size={24} color="#444" style={styles.menuIcon} />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const menuOptions = [
    { id: 'profile', title: 'My Profile', icon: 'person-outline', page: 'UserProfile' },
    { id: 'security', title: 'Security Settings', icon: 'shield-outline', page: 'Security' },
    { id: 'reviews', title: 'Restaurant Reviews', icon: 'restaurant-outline', page: 'RestaurantReviews' },
    { id: 'help', title: 'Help & Contact', icon: 'help-circle-outline', page: 'HelpContact' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="#444" />
        </TouchableOpacity>
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
              renderItem={renderMenuOption}
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
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  suggestions: {
    zIndex: 10,
  },
  placesContainer: {
    width: "100%",
    zIndex: 10,
    padding: 10,
    borderRadius: 8,
    height: "30%",
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
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 24,
    width: 305,
    height: 58,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    backgroundColor: "#88becc",
    paddingVertical: 12,
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
    marginVertical: 10,
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
});

export default ChooseRestaurantPage;