import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen({ navigation, route }) {
  const { barber, service } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }
    
    navigation.navigate('Payment', {
      booking: {
        barber,
        service,
        date: selectedDate,
        time: selectedTime
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.barberName}>{barber.name}</Text>
        <Text style={styles.serviceDetails}>
          {service?.name} • {service?.duration} • {service?.price}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Select Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date.toISOString()}
            style={[
              styles.dateCard,
              selectedDate?.toDateString() === date.toDateString() && styles.selectedDate
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.dayText, selectedDate?.toDateString() === date.toDateString() && styles.selectedText]}>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
            <Text style={[styles.dateText, selectedDate?.toDateString() === date.toDateString() && styles.selectedText]}>
              {date.getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Select Time</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeCard, selectedTime === time && styles.selectedTime]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.bookButton, (!selectedDate || !selectedTime) && styles.disabledButton]}
        onPress={handleBooking}
        disabled={!selectedDate || !selectedTime}
      >
        <Text style={styles.bookButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  serviceInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  barberName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  serviceDetails: {
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    margin: 20,
  },
  dateList: {
    paddingHorizontal: 15,
  },
  dateCard: {
    width: 65,
    height: 75,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#2196F3',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  selectedText: {
    color: '#fff',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 10,
    justifyContent: 'space-between',
  },
  timeCard: {
    width: '31%',
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#2196F3',
  },
  timeText: {
    color: '#333',
  },
  selectedTimeText: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});