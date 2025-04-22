import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';

const PastReviewsPage = ({ navigation }) => {
  // Mock data for past reviews
  const pastReviews = [
    {
      id: '1',
      restaurantName: 'Chipotle',
      dishName: 'Burrito Bowl',
      rating: 4,
      review: 'Great healthy option, loved the fresh ingredients!',
      date: '2024-03-15',
      sustainability: 'High sustainability',
      sustainabilityColor: '#4CAF50'
    },
    {
      id: '2',
      restaurantName: 'Sweetgreen',
      dishName: 'Harvest Bowl',
      rating: 5,
      review: 'Perfect balance of flavors and very filling.',
      date: '2024-03-10',
      sustainability: 'High sustainability',
      sustainabilityColor: '#4CAF50'
    },
  ];

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      
      <Text style={styles.dishName}>{item.dishName}</Text>
      
      <View style={styles.ratingContainer}>
        <AirbnbRating
          count={5}
          defaultRating={item.rating}
          size={20}
          showRating={false}
          isDisabled={true}
          selectedColor="#FFD700"
        />
      </View>

      <View style={[styles.sustainabilityBadge, { backgroundColor: item.sustainabilityColor }]}>
        <Text style={styles.sustainabilityText}>{item.sustainability}</Text>
      </View>
      
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.title}>Your Past Reviews</Text>

      <FlatList
        data={pastReviews}
        renderItem={renderReviewItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.reviewsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginVertical: 20,
  },
  reviewsList: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  dishName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  ratingContainer: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sustainabilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  sustainabilityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});

export default PastReviewsPage; 