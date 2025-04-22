import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';

export default function RestaurantReview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { restaurant, menuItems, userPreferences } = params;

  const handleWriteReview = (item) => {
    router.push({
      pathname: '/write-review',
      params: {
        dishName: item.name,
        restaurantName: restaurant.name,
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
}); 