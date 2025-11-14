import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './theme';

// Define placeholder screens.  These should be replaced with full
// implementations once the UI is designed.
function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Home</Text>
      <Text>Next visit, open invoices, membership status and promotions will appear here.</Text>
    </View>
  );
}

function JobsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Jobs</Text>
      <Text>A list of your open and past jobs will be displayed here.</Text>
    </View>
  );
}

function RequestsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Requests</Text>
      <Text>Create a new service request or track existing requests.</Text>
    </View>
  );
}

function InvoicesScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Invoices</Text>
      <Text>View and pay your invoices here.</Text>
    </View>
  );
}

function MessagesScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Messages</Text>
      <Text>Chat threads for each job will appear here.</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Account</Text>
      <Text>Manage your profile, properties, payment methods and notifications.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.secondary,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Jobs" component={JobsScreen} />
        <Tab.Screen name="Requests" component={RequestsScreen} />
        <Tab.Screen name="Invoices" component={InvoicesScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.secondary,
  },
});