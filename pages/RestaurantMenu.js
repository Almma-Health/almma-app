import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";

const RestaurantMenu = ({ navigation, route }) => {
  const { restaurant, menuItems, userPreferences } = route.params;
  console.log("menuItems: " + menuItems);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton />
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.address}>{restaurant.address}</Text>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>Personalized Recommendations for {userPreferences.name}</Text>
          <Text style={styles.userInfoDetail}>Diet: {userPreferences.dietaryPreference}</Text>
          {userPreferences.noGoFoods && userPreferences.noGoFoods.length > 0 && (
            <Text style={styles.userInfoDetail}>
              No-Go Foods: {Array.isArray(userPreferences.noGoFoods) 
                ? userPreferences.noGoFoods.join(', ') 
                : userPreferences.noGoFoods}
            </Text>
          )}
        </View>

        <Text style={styles.menuTitle}>Menu Items</Text>
        <Text style={styles.menuSubtitle}>
          Items are rated for compatibility with your preferences
        </Text>

        {menuItems.map((item, index) => (
            console.log("item: " + item),
          <View key={index} style={styles.menuItemCard}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <View style={[
                styles.compatibilityBadge, 
                {backgroundColor: item.compatibility.color}
              ]}>
                <Text style={styles.compatibilityText}>
                  {item.compatibility.label}
                </Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              {[...Array(3)].map((_, i) => (
                <Ionicons 
                  key={i}
                  name={i < item.compatibility.rating ? "star" : "star-outline"} 
                  size={20} 
                  color={i < item.compatibility.rating ? "#FFD700" : "#ccc"} 
                />
              ))}
            </View>
          </View>
        ))}

        <View style={styles.compatibilityLegend}>
          <Text style={styles.legendTitle}>Compatibility Guide:</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: "#4CAF50"}]}></View>
            <Text style={styles.legendText}>High Compatibility (3)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: "#FFC107"}]}></View>
            <Text style={styles.legendText}>Medium Compatibility (2)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: "#F44336"}]}></View>
            <Text style={styles.legendText}>Low Compatibility (1)</Text>
          </View>
        </View>
      </ScrollView>
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
  contentContainer: {
    flex: 1,
    marginTop: 150,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#011a59",
    textAlign: "center",
  },
  address: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  userInfoContainer: {
    backgroundColor: "#f0f7fa",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#011a59",
  },
  userInfoDetail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
    color: "#011a59",
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  menuItemCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  compatibilityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  compatibilityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  compatibilityLegend: {
    marginTop: 30,
    marginBottom: 50,
    padding: 15,
    backgroundColor: "#f0f7fa",
    borderRadius: 10,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
});

export default RestaurantMenu; 