import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useStore } from '../store';
import { colors } from '../theme';

/*
 * HomeScreen
 *
 * This screen displays a dashboard summarising the most important
 * information for the customer: the next scheduled job, any open
 * invoices, membership status and the latest promotion.  It loads
 * data from the Zustand store and renders simple cards for each
 * section.  As we integrate real services, this screen can be
 * enhanced to include links to detailed views and additional
 * content such as sensor alerts and recent chat messages.
 */

export default function HomeScreen() {
  const jobs = useStore((state) => state.jobs);
  const invoices = useStore((state) => state.invoices);
  const membership = useStore((state) => state.membership);
  const promos = useStore((state) => state.promos);

  const fetchJobs = useStore((state) => state.fetchJobs);
  const fetchInvoices = useStore((state) => state.fetchInvoices);
  const fetchMembership = useStore((state) => state.fetchMembership);
  const fetchPromos = useStore((state) => state.fetchPromos);

  useEffect(() => {
    // Load data on mount.  In future we may want to refresh on
    // app focus or use SWR/React Query.
    fetchJobs();
    fetchInvoices();
    fetchMembership();
    fetchPromos();
  }, [fetchJobs, fetchInvoices, fetchMembership, fetchPromos]);

  // Determine the next scheduled job by filtering for open jobs
  // with a scheduled_at date in the future.
  const nextJob = jobs
    .filter((job) => job.status === 'open' && job.scheduled_at)
    .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))[0];

  // Determine the number of open invoices
  const openInvoices = invoices.filter((inv) => inv.status === 'open');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome</Text>
      {/* Next visit card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Next Visit</Text>
        {nextJob ? (
          <Text style={styles.cardText}>
            Job #{nextJob.id} on{' '}
            {new Date(nextJob.scheduled_at).toLocaleString()}
          </Text>
        ) : (
          <Text style={styles.cardText}>No upcoming jobs scheduled.</Text>
        )}
      </View>
      {/* Open invoices card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Open Invoices</Text>
        <Text style={styles.cardText}>{openInvoices.length}</Text>
      </View>
      {/* Membership card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Membership</Text>
        {membership ? (
          <Text style={styles.cardText}>
            {membership.plan} ({membership.status})
            {'\n'}Renews {membership.renews_at &&
              new Date(membership.renews_at).toLocaleDateString()}
          </Text>
        ) : (
          <Text style={styles.cardText}>Loading membership...</Text>
        )}
      </View>
      {/* Promotion card */}
      {promos.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Promotion</Text>
          <Text style={styles.cardText}>{promos[0].title}</Text>
          <Text style={styles.cardSubtext}>{promos[0].body}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: colors.dark,
  },
  cardSubtext: {
    fontSize: 12,
    color: colors.dark,
    marginTop: 4,
  },
});