import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

const BarberProfileScreen = ({ navigation, route }) => {
  const [selectedTab, setSelectedTab] = useState('services');
  const [reviews] = useState([
    { 
      id: 1, 
      rating: 5, 
      review: "Great service, very professional", 
      user: "Mike", 
      date: "2024-03-01", 
      tags: ["Professional", "Skilled"] 
    },
    { 
      id: 2, 
      rating: 4, 
      review: "Good haircut, will come back", 
      user: "John", 
      date: "2024-02-28", 
      tags: ["Clean", "Friendly"] 
    },
  ]);

  const barber = {
    name: 'John Doe',
    rating: 4.8,
    reviews: 120,
    experience: '5 years',
    location: 'Dublin, Ireland',
    about: 'Professional barber specializing in modern and classic cuts.',
    services: [
      { id: 1, name: 'Haircut', duration: '30 min', price: '€25' },
      { id: 2, name: 'Beard Trim', duration: '20 min', price: '€15' },
      { id: 3, name: 'Hair + Beard', duration: '45 min', price: '€35' },
      { id: 4, name: 'Kids Haircut', duration: '30 min', price: '€20' },
    ],
    portfolio: [1, 2, 3, 4, 5, 6]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImage} />
        <Text style={styles.name}>{barber.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{barber.rating} ({barber.reviews} reviews)</Text>
        </View>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={16} color="#666" /> {barber.location}
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'services' && styles.activeTab]}
          onPress={() => setSelectedTab('services')}
        >
          <Text style={[styles.tabText, selectedTab === 'services' && styles.activeTabText]}>
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'portfolio' && styles.activeTab]}
          onPress={() => setSelectedTab('portfolio')}
        >
          <Text style={[styles.tabText, selectedTab === 'portfolio' && styles.activeTabText]}>
            Portfolio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'reviews' && styles.activeTab]}
          onPress={() => setSelectedTab('reviews')}
        >
          <Text style={[styles.tabText, selectedTab === 'reviews' && styles.activeTabText]}>
            Reviews
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'services' && (
        <View style={styles.servicesContainer}>
          {barber.services.map(service => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => navigation.navigate('Booking', { service, barber })}
            >
              <View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedTab === 'portfolio' && (
        <View style={styles.portfolioContainer}>
          {barber.portfolio.map(imageId => (
            <View key={imageId} style={styles.portfolioImage} />
          ))}
        </View>
      )}

      {selectedTab === 'reviews' && (
        <View style={styles.reviewsContainer}>
          <View style={styles.reviewSummary}>
            <View style={styles.ratingOverview}>
              <Text style={styles.ratingNumber}>{barber.rating}</Text>
              <Rating
                readonly
                startingValue={barber.rating}
                imageSize={20}
                style={{ marginVertical: 5 }}
              />
              <Text style={styles.reviewCount}>{barber.reviews} reviews</Text>
            </View>
            <View style={styles.tagSummary}>
              {['Professional', 'Clean', 'Skilled'].map(tag => (
                <View key={tag} style={styles.tagBadge}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.user}</Text>
                <Text style={styles.reviewDate}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
              <Rating
                readonly
                startingValue={review.rating}
                imageSize={16}
                style={{ alignSelf: 'flex-start', marginVertical: 5 }}
              />
              <Text style={styles.reviewText}>{review.review}</Text>
              <View style={styles.reviewTags}>
                {review.tags.map(tag => (
                  <View key={tag} style={styles.miniTag}>
                    <Text style={styles.miniTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => navigation.navigate('Booking', { barber })}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    color: '#666',
  },
  location: {
    color: '#666',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  servicesContainer: {
    padding: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  serviceDuration: {
    color: '#666',
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  portfolioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  portfolioImage: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
    margin: '1%',
    borderRadius: 5,
  },
  bookButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    padding: 20,
  },
  reviewSummary: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  reviewCount: {
    color: '#666',
  },
  tagSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    color: '#2196F3',
    fontSize: 12,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewerName: {
    fontWeight: '600',
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  reviewText: {
    marginVertical: 10,
  },
  reviewTags: {
    flexDirection: 'row',
    gap: 6,
  },
  miniTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  miniTagText: {
    color: '#666',
    fontSize: 11,
  }
});

export default BarberProfileScreen;