import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import RequestForm from './RequestForm';
import { colors } from '../theme';

/*
 * RequestsScreen
 *
 * Provides a wrapper around the RequestForm component.  When the
 * form is submitted this screen posts the request to the backend and
 * displays a confirmation message.  In future iterations this
 * screen could also list existing requests with their status and
 * allow rescheduling.
 */

export default function RequestsScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState(null);

  const handleSubmit = async (payload) => {
    try {
      const res = await fetch('http://localhost:8000/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setRequestId(data.id);
      setSubmitted(true);
    } catch (err) {
      console.error('Request error:', err);
      Alert.alert('Error', 'Unable to submit request');
    }
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Request Submitted!</Text>
        <Text style={styles.message}>Your request ID is {requestId}. We'll be in touch soon.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Service Request</Text>
      <RequestForm onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.dark,
    textAlign: 'center',
  },
});