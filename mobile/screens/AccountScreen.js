import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors } from '../theme';

/*
 * AccountScreen
 *
 * Displays the user's profile information and membership status.  This
 * screen could be expanded to allow editing profile fields, managing
 * saved properties, updating payment methods and adjusting
 * notification preferences.  Here we simply read data from the
 * store and present it to the user.
 */

export default function AccountScreen() {
  const user = useStore((state) => state.user);
  const membership = useStore((state) => state.membership);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchMembership = useStore((state) => state.fetchMembership);

  useEffect(() => {
    fetchUser();
    fetchMembership();
  }, [fetchUser, fetchMembership]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account</Text>
      {user ? (
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
          {user.phone && (
            <>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </>
          )}
        </View>
      ) : (
        <Text>Loading profile...</Text>
      )}
      {membership && (
        <View style={styles.section}>
          <Text style={styles.label}>Membership Plan</Text>
          <Text style={styles.value}>{membership.plan}</Text>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{membership.status}</Text>
          {membership.renews_at && (
            <>
              <Text style={styles.label}>Renews</Text>
              <Text style={styles.value}>
                {new Date(membership.renews_at).toLocaleDateString()}
              </Text>
            </>
          )}
        </View>
      )}
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
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: colors.dark,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: colors.secondary,
  },
});