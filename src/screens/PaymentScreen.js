import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CardField, useStripe } from '@stripe/stripe-react-native';

export default function PaymentScreen({ navigation, route }) {
  const { booking } = route.params;
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState('deposit');

  const calculateAmount = () => {
    const fullAmount = parseFloat(booking.service.price.replace('€', ''));
    return {
      full: fullAmount,
      deposit: fullAmount * 0.2,
      remaining: fullAmount * 0.8
    };
  };

  const prices = calculateAmount();

  const processPayment = async () => {
    try {
      setLoading(true);
      const amount = paymentType === 'deposit' ? prices.deposit : prices.full;
      
      // Simulated payment processing
      setTimeout(() => {
        navigation.navigate('BookingConfirmation', {
          booking: {
            ...booking,
            paymentDetails: {
              type: paymentType,
              amountPaid: amount,
              remaining: paymentType === 'deposit' ? prices.remaining : 0
            }
          }
        });
      }, 1500);
    } catch (error) {
      Alert.alert('Payment Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{booking.service.name}</Text>
        <Text style={styles.serviceDetails}>
          with {booking.barber.name} • {booking.service.duration}
        </Text>
      </View>

      <View style={styles.paymentOptions}>
        <TouchableOpacity 
          style={[styles.optionCard, paymentType === 'deposit' && styles.selectedOption]}
          onPress={() => setPaymentType('deposit')}
        >
          <Text style={styles.optionTitle}>Pay Deposit</Text>
          <Text style={styles.optionAmount}>€{prices.deposit.toFixed(2)}</Text>
          <Text style={styles.optionNote}>
            Pay 20% now, €{prices.remaining.toFixed(2)} at appointment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionCard, paymentType === 'full' && styles.selectedOption]}
          onPress={() => setPaymentType('full')}
        >
          <Text style={styles.optionTitle}>Pay Full Amount</Text>
          <Text style={styles.optionAmount}>€{prices.full.toFixed(2)}</Text>
          <Text style={styles.optionNote}>Complete payment now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardLabel}>Card Details</Text>
      <CardField
        style={styles.cardField}
        postalCodeEnabled={true}
        cardStyle={{
          backgroundColor: '#F5F5F5',
          textColor: '#000000',
        }}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text>Service Total:</Text>
          <Text style={styles.summaryValue}>€{prices.full.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Amount Due Now:</Text>
          <Text style={styles.summaryValue}>
            €{(paymentType === 'deposit' ? prices.deposit : prices.full).toFixed(2)}
          </Text>
        </View>
        {paymentType === 'deposit' && (
          <View style={styles.summaryRow}>
            <Text>Remaining at Appointment:</Text>
            <Text style={styles.summaryValue}>€{prices.remaining.toFixed(2)}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.payButton, loading && styles.disabledButton]}
        onPress={processPayment}
        disabled={loading}
      >
        <Text style={styles.payButtonText}>
          {loading ? 'Processing...' : `Pay ${paymentType === 'deposit' ? 'Deposit' : 'Full Amount'}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  serviceInfo: {
    marginBottom: 30,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceDetails: {
    color: '#666',
    fontSize: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  optionCard: {
    width: '48%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#2196F3',
    backgroundColor: '#e3f2fd',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  optionAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionNote: {
    fontSize: 12,
    color: '#666',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },
  summaryContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryValue: {
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});