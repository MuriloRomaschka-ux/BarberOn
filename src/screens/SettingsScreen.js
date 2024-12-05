import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen({ navigation }) {
  const { setUser } = useAuth();

  const settingsItems = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: 'person-outline', route: 'EditProfile' },
        { label: 'Password & Security', icon: 'lock-closed-outline', route: 'Security' },
        { label: 'Payment Methods', icon: 'card-outline', route: 'PaymentMethods' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Notifications', icon: 'notifications-outline', route: 'NotificationSettings' },
        { label: 'Language', icon: 'language-outline', route: 'Language' },
        { label: 'Location', icon: 'location-outline', route: 'Location' }
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: 'help-circle-outline', route: 'Help' },
        { label: 'Contact Us', icon: 'mail-outline', route: 'Contact' },
        { label: 'Privacy Policy', icon: 'shield-outline', route: 'Privacy' },
        { label: 'Terms of Service', icon: 'document-text-outline', route: 'Terms' }
      ]
    }
  ];

  const handleLogout = () => {
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        {settingsItems.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={styles.itemLeft}>
                  <Ionicons name={item.icon} size={22} color="#666" />
                  <Text style={styles.itemLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  version: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
});