import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CardField, useStripe } from '@stripe/stripe-react-native';

export default function AddPaymentMethodScreen({ navigation }) {
  const { createPaymentMethod } = useStripe();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [setAsDefault, setSetAsDefault] = useState(true);

  const handleAddCard = async () => {
    if (!name.trim()) {
      alert('Please enter cardholder name');
      return;
    }

    try {
      setLoading(true);
      // Implement card addition logic
      navigation.goBack();
    } catch (error) {
      alert(error.message);
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
        <Text style={styles.headerTitle}>Add New Card</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cardholder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name on card"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Details</Text>
          <CardField
            style={styles.cardField}
            postalCodeEnabled={true}
            cardStyle={{
              backgroundColor: '#F5F5F5',
              textColor: '#000000',
            }}
          />
        </View>

        <TouchableOpacity 
          style={styles.defaultOption}
          onPress={() => setSetAsDefault(!setAsDefault)}
        >
          <View style={styles.checkbox}>
            {setAsDefault && <Ionicons name="checkmark" size={16} color="#2196F3" />}
          </View>
          <Text style={styles.defaultText}>Set as default payment method</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.addButton, loading && styles.disabledButton]}
          onPress={handleAddCard}
          disabled={loading}
        >
          <Text style={styles.addButtonText}>
            {loading ? 'Adding Card...' : 'Add Card'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.securityInfo}>
        <Ionicons name="shield-checkmark-outline" size={24} color="#4CAF50" />
        <Text style={styles.securityText}>
          Your card information is encrypted and secure
        </Text>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  cardField: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  defaultOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  securityText: {
    marginLeft: 10,
    color: '#666',
    flex: 1,
  },
});