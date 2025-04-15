import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import MenuButton from "../components/MenuButton";

// Sample data for reviews
const sampleReviews = [
  {
    id: "1",
    restaurantName: "The Green Plate",
    rating: 4.5,
    review: "Great vegan options and friendly staff! The quinoa bowl was amazing.",
    date: "2024-03-15",
    userName: "Sarah M.",
  },
  {
    id: "2",
    restaurantName: "Ocean's Catch",
    rating: 3.8,
    review: "Good seafood selection, but could use more gluten-free options.",
    date: "2024-03-10",
    userName: "John D.",
  },
  {
    id: "3",
    restaurantName: "Spice Garden",
    rating: 4.2,
    review: "Excellent Indian cuisine with many vegetarian choices. The service was quick and attentive.",
    date: "2024-03-05",
    userName: "Emma L.",
  },
];

const RestaurantReviewsPage = ({ navigation }) => {
  const [reviews] = useState(sampleReviews);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={20}
          color="#FFD700"
        />
      );
    }
    return stars;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <View style={styles.ratingContainer}>
          {renderStars(item.rating)}
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
      <View style={styles.reviewFooter}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Back Button + Logo */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <MenuButton />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Restaurant Reviews</Text>
        
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reviewsList}
          showsVerticalScrollIndicator={false}
        />
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
  contentContainer: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
});

export default RestaurantReviewsPage; 