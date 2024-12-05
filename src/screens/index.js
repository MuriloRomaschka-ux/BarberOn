// src/screens/index.js - Main export file for screens
export { default as LoginScreen } from './LoginScreen';
export { default as RegisterScreen } from './RegisterScreen';
export { default as HomeScreen } from './HomeScreen';
export { default as BarberProfileScreen } from './BarberProfileScreen';
export { default as BookingScreen } from './BookingScreen';
export { default as BookingConfirmationScreen } from './BookingConfirmationScreen';
export { default as ReviewScreen } from './ReviewScreen';
export { default as ProfileScreen } from './ProfileScreen';
export { default as PaymentScreen } from './PaymentScreen';

// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screens from '../screens';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Screens.LoginScreen} />
        <Stack.Screen name="Register" component={Screens.RegisterScreen} />
        <Stack.Screen name="Home" component={Screens.HomeScreen} />
        <Stack.Screen name="BarberProfile" component={Screens.BarberProfileScreen} />
        <Stack.Screen name="Booking" component={Screens.BookingScreen} />
        <Stack.Screen name="BookingConfirmation" component={Screens.BookingConfirmationScreen} />
        <Stack.Screen name="Review" component={Screens.ReviewScreen} />
        <Stack.Screen name="Profile" component={Screens.ProfileScreen} />
        <Stack.Screen name="Payment" component={Screens.PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// src/services/api.js
const BASE_URL = 'YOUR_API_URL';

export const api = {
  login: async (email, password) => {
    // Implement login logic
  },
  register: async (userData) => {
    // Implement registration logic
  },
  bookAppointment: async (bookingData) => {
    // Implement booking logic
  },
  getBarbers: async () => {
    // Implement get barbers logic
  },
  submitReview: async (reviewData) => {
    // Implement review submission
  },
  processPayment: async (paymentData) => {
    // Implement payment processing
  }
};

// App.js
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  return (
    <AuthProvider>
      <StripeProvider publishableKey="YOUR_STRIPE_KEY">
        <AppNavigator />
      </StripeProvider>
    </AuthProvider>
  );
}

// package.json dependencies
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "@react-navigation/stack": "^6.x",
    "@stripe/stripe-react-native": "^0.x",
    "expo": "~48.0.0",
    "react": "18.2.0",
    "react-native": "0.71.8",
    "react-native-gesture-handler": "~2.9.0",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "@expo/vector-icons": "^13.0.0",
    "react-native-ratings": "^8.1.0"
  }
}