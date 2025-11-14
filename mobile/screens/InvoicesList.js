import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useStore } from '../store';
import { colors } from '../theme';

/*
 * InvoicesList
 *
 * This screen lists invoices for the current user and allows them to
 * initiate payment for open invoices.  When the user taps the pay
 * button, the screen makes a POST request to the backend to obtain a
 * Stripe PaymentIntent client secret.  In a production app this
 * client secret would be passed to the Stripe SDK.  Here we simply
 * display an alert to simulate the flow.
 */

export default function InvoicesList() {
  const invoices = useStore((state) => state.invoices);
  const fetchInvoices = useStore((state) => state.fetchInvoices);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handlePay = async (invoiceId) => {
    try {
      const res = await fetch(`http://localhost:8000/invoices/${invoiceId}/pay`, {
        method: 'POST',
      });
      const data = await res.json();
      Alert.alert('Payment Initiated', `Client secret: ${data.client_secret}`);
    } catch (err) {
      console.error('Payment error:', err);
      Alert.alert('Error', 'Unable to initiate payment.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Invoice #{item.id}</Text>
      <Text style={styles.cardSubtitle}>Amount Due: ${item.amount_due.toFixed(2)}</Text>
      <Text style={styles.cardSubtitle}>Status: {item.status}</Text>
      {item.status === 'open' && (
        <Button
          title="Pay Now"
          onPress={() => handlePay(item.id)}
          color={colors.primary}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No invoices found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.dark,
    marginTop: 4,
  },
});