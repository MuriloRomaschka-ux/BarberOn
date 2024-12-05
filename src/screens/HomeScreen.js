import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredBarbers = [
    { id: 1, name: 'John Doe', rating: 4.8, reviews: 120, specialties: ['Haircut', 'Beard'] },
    { id: 2, name: 'Mike Smith', rating: 4.9, reviews: 85, specialties: ['Fade', 'Kids Cut'] },
    { id: 3, name: 'Alex Brown', rating: 4.7, reviews: 95, specialties: ['Classic Cut', 'Shave'] },
  ];

  const popularServices = [
    { id: 1, name: 'Haircut', price: '€25', duration: '30 min' },
    { id: 2, name: 'Beard Trim', price: '€15', duration: '20 min' },
    { id: 3, name: 'Hair + Beard', price: '€35', duration: '45 min' },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      barber: 'John Doe',
      service: 'Haircut',
      date: '2024-03-10',
      time: '14:30',
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.nameText}>{user?.name || 'Guest'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileIcon}>
            <Ionicons name="person-circle-outline" size={32} color="#333" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search barbers or services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {upcomingAppointments.length > 0 && (
        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
          {upcomingAppointments.map(appointment => (
            <TouchableOpacity 
              key={appointment.id} 
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('BookingConfirmation', { booking: appointment })}
            >
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentBarber}>{appointment.barber}</Text>
                <Text style={styles.appointmentService}>{appointment.service}</Text>
                <Text style={styles.appointmentDateTime}>
                  {new Date(appointment.date).toLocaleDateString('en-IE', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })} at {appointment.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Featured Barbers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barbersList}>
        {featuredBarbers.map(barber => (
          <TouchableOpacity
            key={barber.id}
            style={styles.barberCard}
            onPress={() => navigation.navigate('BarberProfile', { barberId: barber.id })}
          >
            <View style={styles.barberImage} />
            <Text style={styles.barberName}>{barber.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {barber.rating} ({barber.reviews})
              </Text>
            </View>
            <View style={styles.specialtiesContainer}>
              {barber.specialties.map((specialty, index) => (
                <Text key={index} style={styles.specialtyTag}>
                  {specialty}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Popular Services</Text>
      {popularServices.map(service => (
        <TouchableOpacity 
          key={service.id}
          style={styles.serviceCard}
          onPress={() => navigation.navigate('ServiceSearch', { serviceId: service.id })}
        >
          <View>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDuration}>{service.duration}</Text>
          </View>
          <Text style={styles.servicePrice}>{service.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileIcon: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  upcomingContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f9ff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentBarber: {
    fontSize: 16,
    fontWeight: '600',
  },
  appointmentService: {
    color: '#666',
    marginVertical: 5,
  },
  appointmentDateTime: {
    color: '#2196F3',
    fontWeight: '500',
  },
  barbersList: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  barberCard: {
    width: 200,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
  },
  barberImage: {
    width: 180,
    height: 180,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  barberName: {
    fontSize: 16,
    fontWeight: '600',
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
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  specialtyTag: {
    fontSize: 12,
    color: '#2196F3',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
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
});