import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppointmentsScreen({ navigation }) {
  const appointments = [
    {
      id: 1,
      barber: 'John Doe',
      service: 'Haircut',
      date: '2024-03-10',
      time: '14:30',
      status: 'upcoming',
      price: '€25'
    },
    {
      id: 2,
      barber: 'Mike Smith',
      service: 'Beard Trim',
      date: '2024-02-28',
      time: '11:00',
      status: 'completed',
      price: '€15'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return '#2196F3';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#FF3B30';
      default: return '#666';
    }
  };

  const handleCancel = (appointmentId) => {
    // Implement cancellation logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {appointments.map(appointment => (
          <TouchableOpacity 
            key={appointment.id}
            style={styles.appointmentCard}
            onPress={() => navigation.navigate('AppointmentDetails', { appointment })}
          >
            <View style={styles.cardHeader}>
              <View style={styles.statusContainer}>
                <View 
                  style={[
                    styles.statusDot, 
                    { backgroundColor: getStatusColor(appointment.status) }
                  ]} 
                />
                <Text style={styles.statusText}>{appointment.status}</Text>
              </View>
              <Text style={styles.price}>{appointment.price}</Text>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={20} color="#666" />
                <Text style={styles.infoText}>{appointment.barber}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="cut" size={20} color="#666" />
                <Text style={styles.infoText}>{appointment.service}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={20} color="#666" />
                <Text style={styles.infoText}>
                  {new Date(appointment.date).toLocaleDateString('en-IE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color="#666" />
                <Text style={styles.infoText}>{appointment.time}</Text>
              </View>
            </View>

            {appointment.status === 'upcoming' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.rescheduleButton}
                  onPress={() => navigation.navigate('Booking', { 
                    appointment,
                    mode: 'reschedule' 
                  })}
                >
                  <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => handleCancel(appointment.id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}

            {appointment.status === 'completed' && !appointment.reviewed && (
              <TouchableOpacity 
                style={styles.reviewButton}
                onPress={() => navigation.navigate('Review', { appointment })}
              >
                <Text style={styles.reviewButtonText}>Leave Review</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
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
  appointmentCard: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardBody: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
  reviewButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});