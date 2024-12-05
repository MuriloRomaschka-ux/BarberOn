import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UserProfileScreen({ navigation }) {
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    // Fetch the user's booking history from local storage or an API
    const fetchBookingHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('bookingHistory');
        if (storedHistory) {
          setBookingHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };
    fetchBookingHistory();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.bookingHistoryContainer}>
        <Text style={styles.sectionTitle}>Booking History</Text>
        {bookingHistory.length > 0 ? (
          <FlatList
            data={bookingHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.bookingCard}>
                {/* Display booking details */}
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyMessage}>No booking history yet.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... add your styles here
});