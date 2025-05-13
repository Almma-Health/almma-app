import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';
import ReviewList from '../components/ReviewList';
import { ENDPOINTS } from '../config/api';
import { supabase } from '../lib/supabase';

export default function RestaurantReview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { restaurant, menuItems, userPreferences } = params;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurant?.id) {
      fetchReviews();
    }
  }, [restaurant]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleWriteReview = (item) => {
    router.push({
      pathname: '/write-review',
      params: {
        dishName: item.name,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id,
        sustainability: item.sustainability,
        sustainabilityColor: item.sustainabilityColor
      }
    });
  };

  const handleShare = () => {
    // Implement share functionality
  };

  const handleShowMore = () => {
    // Show more menu options
  };

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
        <MenuButton onPress={() => {}} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>The best menu items for you at</Text>
        
        <View style={styles.restaurantLogoContainer}>
          <Image
            source={require('../assets/Med_ResLogo.jpg')}
            style={styles.restaurantLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.menuItemsContainer}>
          {menuItems?.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <View style={[styles.sustainabilityBadge, { backgroundColor: item.sustainabilityColor }]}>
                <Text style={styles.sustainabilityText}>{item.sustainability}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleShowMore}>
          <Text style={styles.buttonText}>Show more options</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Share!</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleWriteReview(menuItems[0])}
        >
          <Text style={styles.buttonText}>Write a review</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#7FB3D5" style={styles.loader} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 20,
  },
  restaurantLogoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  restaurantLogo: {
    width: '80%',
    height: 100,
  },
  menuItemsContainer: {
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  sustainabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sustainabilityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#7FB3D5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
}); 