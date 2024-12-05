import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentMethodsScreen({ navigation }) {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '12/24',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiry: '06/25',
      isDefault: false
    }
  ]);

  const getCardIcon = (type) => {
    switch(type) {
      case 'visa': return 'card';
      case 'mastercard': return 'card-outline';
      default: return 'card';
    }
  };

  const setDefaultCard = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {cards.map(card => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <Ionicons name={getCardIcon(card.type)} size={24} color="#2196F3" />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardNumber}>•••• {card.last4}</Text>
                  <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
                </View>
                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <View style={styles.cardActions}>
                {!card.isDefault && (
                  <TouchableOpacity 
                    onPress={() => setDefaultCard(card.id)}
                    style={styles.actionButton}
                  >
                    <Text style={styles.actionButtonText}>Set Default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  onPress={() => deleteCard(card.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPaymentMethod')}
        >
          <Ionicons name="add" size={24} color="#2196F3" />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Secure Payments</Text>
          <Text style={styles.infoText}>
            All transactions are encrypted and processed securely using industry-standard protocols.
          </Text>
        </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  cardItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: 15,
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  cardExpiry: {
    color: '#666',
    marginTop: 5,
  },
  defaultBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  defaultText: {
    color: '#2196F3',
    fontSize: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  actionButtonText: {
    color: '#2196F3',
  },
  deleteButton: {
    padding: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#2196F3',
    fontSize: 16,
    marginLeft: 10,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoText: {
    color: '#666',
    lineHeight: 20,
  },
});