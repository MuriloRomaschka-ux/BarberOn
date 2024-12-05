import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SelectServiceScreen({ navigation, route }) {
  const { barber } = route.params;
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { id: 1, name: 'Haircut', duration: '30 min', price: '€25', description: 'Classic haircut with styling' },
    { id: 2, name: 'Beard Trim', duration: '20 min', price: '€15', description: 'Beard shaping and trim' },
    { id: 3, name: 'Hair + Beard', duration: '45 min', price: '€35', description: 'Full grooming service' },
    { id: 4, name: 'Hair Color', duration: '60 min', price: '€50', description: 'Professional hair coloring' },
    { id: 5, name: 'Kids Cut', duration: '20 min', price: '€20', description: 'Haircut for children under 12' }
  ];

  const toggleService = (service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totalPrice = selectedServices.reduce((sum, service) => 
    sum + parseInt(service.price.replace('€', '')), 0
  );

  const renderService = ({ item }) => {
    const isSelected = selectedServices.find(s => s.id === item.id);
    
    return (
      <TouchableOpacity 
        style={[styles.serviceCard, isSelected && styles.selectedCard]}
        onPress={() => toggleService(item)}
      >
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceDescription}>{item.description}</Text>
          <View style={styles.serviceDetails}>
            <Text style={styles.duration}>
              <Ionicons name="time-outline" size={14} color="#666" /> {item.duration}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkedBox]}>
          {isSelected && <Ionicons name="checkmark" size={20} color="#fff" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Services</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.servicesList}
      />

      {selectedServices.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>€{totalPrice}</Text>
          </View>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('Booking', {
              barber,
              services: selectedServices
            })}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
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
  servicesList: {
    padding: 15,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  serviceInfo: {
    flex: 1,
    marginRight: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  serviceDescription: {
    color: '#666',
    marginBottom: 10,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});