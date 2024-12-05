import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) {
  const [settings, setSettings] = useState({
    appointments: true,
    reminders: true,
    promotions: false,
    messages: true
  });

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Reminder: Haircut with John Doe tomorrow at 2:30 PM',
      time: '1h ago',
      unread: true
    },
    {
      id: 2,
      type: 'promotion',
      title: '20% Off Next Booking',
      message: 'Book your next appointment this week and get 20% off',
      time: '2h ago',
      unread: false
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'appointment': return 'calendar';
      case 'promotion': return 'pricetag';
      case 'message': return 'chatbubble';
      default: return 'notifications';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationSettings')}>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          {Object.entries(settings).map(([key, value]) => (
            <View key={key} style={styles.settingItem}>
              <Text style={styles.settingText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              <Switch
                value={value}
                onValueChange={(newValue) => 
                  setSettings(prev => ({ ...prev, [key]: newValue }))
                }
              />
            </View>
          ))}
        </View>

        <View style={styles.notificationsSection}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          
          {notifications.map(notification => (
            <TouchableOpacity 
              key={notification.id}
              style={[
                styles.notificationItem,
                notification.unread && styles.unreadItem
              ]}
            >
              <View style={styles.notificationIcon}>
                <Ionicons 
                  name={getIcon(notification.type)} 
                  size={24} 
                  color="#2196F3" 
                />
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                  {notification.unread && (
                    <View style={styles.unreadDot} />
                  )}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  settingsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
  },
  notificationsSection: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unreadItem: {
    backgroundColor: '#f5f9ff',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  notificationMessage: {
    color: '#666',
    marginBottom: 5,
  },
  notificationTime: {
    color: '#999',
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginLeft: 5,
  }
});