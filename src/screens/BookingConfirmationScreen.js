import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookingConfirmationScreen({ navigation, route }) {
  const { booking } = route.params;

  const bookingDetails = [
    {
      icon: "person-outline",
      label: "Barber",
      value: booking.barber.name
    },
    {
      icon: "cut-outline",
      label: "Service",
      value: `${booking.service.name} - ${booking.service.duration}`
    },
    {
      icon: "calendar-outline",
      label: "Date & Time",
      values: [
        booking.date.toLocaleDateString('en-IE', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        booking.time
      ]
    },
    {
      icon: "cash-outline",
      label: "Price",
      value: booking.service.price
    }
  ];

  if (booking.paymentDetails) {
    bookingDetails.push({
      icon: "wallet-outline",
      label: "Payment",
      value: `Paid: €${booking.paymentDetails.amountPaid.toFixed(2)}${
        booking.paymentDetails.remaining > 0 
          ? ` (€${booking.paymentDetails.remaining.toFixed(2)} due at appointment)`
          : ''
      }`
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        </View>
        
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your appointment has been scheduled</Text>

        <View style={styles.bookingDetails}>
          {bookingDetails.map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              <Ionicons name={detail.icon} size={24} color="#666" />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                {detail.values ? (
                  detail.values.map((value, i) => (
                    <Text key={i} style={styles.detailValue}>{value}</Text>
                  ))
                ) : (
                  <Text style={styles.detailValue}>{detail.value}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.reviewButton}
          onPress={() => navigation.navigate('Review', { booking })}
        >
          <Text style={styles.reviewButtonText}>Leave a Review</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.calendarButton}
          onPress={() => {/* Calendar integration */}}
        >
          <Ionicons name="calendar" size={20} color="#2196F3" />
          <Text style={styles.calendarText}>Add to Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  successIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  bookingDetails: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reviewButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  calendarText: {
    color: '#2196F3',
    marginLeft: 10,
    fontSize: 16,
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});