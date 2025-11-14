import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors } from '../theme';

// Renders a single job item
function JobItem({ job }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Job #{job.id}</Text>
      <Text style={styles.cardSubtitle}>Status: {job.status}</Text>
      {job.scheduled_at && (
        <Text style={styles.cardSubtitle}>
          Scheduled: {new Date(job.scheduled_at).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

export default function JobsList() {
  const jobs = useStore((state) => state.jobs);
  const fetchJobs = useStore((state) => state.fetchJobs);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <JobItem job={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No jobs found.</Text>}
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