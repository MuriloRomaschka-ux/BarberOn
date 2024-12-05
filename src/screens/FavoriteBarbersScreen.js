import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteBarbersScreen({ navigation }) {
  const favoriteBarbers = [
    {
      id: 1,
      name: 'John Doe',
      rating: 4.8,
      reviews: 120,
      location: 'Dublin City',
      lastVisited: '2024-02-28',
      services: ['Haircut', 'Beard Trim'],
      availability: 'Available Today'
    },
    {
      id: 2,
      name: 'Mike Smith',
      rating: 4.9,
      reviews: 85,
      location: 'Galway',
      lastVisited: '2024-02-15',
      services: ['Styling', 'Hair Color'],
      availability: 'Next Available: Tomorrow'
    }
  ];

  const removeFromFavorites = (barberId) => {
    // Implement remove from favorites logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite Barbers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {favoriteBarbers.map(barber => (
          <View key={barber.id} style={styles.barberCard}>
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => removeFromFavorites(barber.id)}
            >
              <Ionicons name="heart" size={24} color="#FF3B30" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cardContent}
              onPress={() => navigation.navigate('BarberProfile', { barberId: barber.id })}
            >
              <View style={styles.barberImage} />
              
              <View style={styles.barberInfo}>
                <Text style={styles.barberName}>{barber.name}</Text>
                
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {barber.rating} ({barber.reviews} reviews)
                  </Text>
                </View>

                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <Text style={styles.locationText}>{barber.location}</Text>
                </View>

                <View style={styles.servicesContainer}>
                  {barber.services.map((service, index) => (
                    <View key={index} style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>{service}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.availabilityText}>{barber.availability}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.bookButton}
                onPress={() => navigation.navigate('Booking', { barber })}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.messageButton}
                onPress={() => navigation.navigate('Chat', { barberId: barber.id })}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#2196F3" />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  barberCard: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  favoriteButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  barberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    marginRight: 15,
  },
  barberInfo: {
    flex: 1,
  },
  barberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 5,
    color: '#666',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 5,
  },
  serviceTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceTagText: {
    color: '#2196F3',
    fontSize: 12,
  },
  availabilityText: {
    color: '#4CAF50',
    fontSize: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  bookButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  messageButtonText: {
    color: '#2196F3',
    marginLeft: 5,
  },
});