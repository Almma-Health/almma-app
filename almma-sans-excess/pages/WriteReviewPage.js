import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';

const WriteReviewPage = ({ navigation, route }) => {
  const { dishName, restaurantName, sustainability, sustainabilityColor } = route.params;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSave = () => {
    // Here you would typically send the review to your backend
    console.log('Saving review:', { dishName, rating, review });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Your review</Text>
        
        <View style={styles.dishInfo}>
          <View style={styles.dishDetails}>
            <Text style={styles.dishName}>{dishName}</Text>
            <View style={[styles.sustainabilityBadge, { backgroundColor: sustainabilityColor }]}>
              <Text style={styles.sustainabilityText}>{sustainability}</Text>
            </View>
          </View>
          <Image
            source={require('../assets/Med_ResLogo.jpg')}
            style={styles.restaurantLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={40}
            showRating={false}
            onFinishRating={setRating}
            selectedColor="#FFD700"
          />
        </View>

        <View style={styles.reviewContainer}>
          <TextInput
            style={styles.reviewInput}
            multiline
            placeholder="Write your review here..."
            value={review}
            onChangeText={setReview}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, (!rating || !review) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!rating || !review}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  dishInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishDetails: {
    flex: 1,
    marginRight: 16,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  restaurantLogo: {
    width: 100,
    height: 40,
  },
  sustainabilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sustainabilityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingContainer: {
    marginBottom: 24,
  },
  reviewContainer: {
    marginBottom: 24,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#2e8ea7',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WriteReviewPage; 