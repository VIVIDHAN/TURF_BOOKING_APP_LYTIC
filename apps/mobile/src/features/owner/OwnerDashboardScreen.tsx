import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const OwnerDashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Turf Owner Dashboard</Text>
          <Text style={styles.subtitle}>Overview of today's schedule and revenue</Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Today's Bookings</Text>
            <Text style={styles.metricValue}>12</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Today's Revenue</Text>
            <Text style={styles.metricValue}>₹14,500</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Grounds</Text>
            <Text style={styles.metricValue}>3</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Occupancy Rate</Text>
            <Text style={styles.metricValue}>78%</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Matches Today</Text>
        <View style={styles.slotItem}>
          <Text style={styles.slotTime}>06:00 PM - 07:00 PM</Text>
          <Text style={styles.slotGround}>Ground 1 (Football 7s)</Text>
          <Text style={styles.slotCustomer}>Booked by: Rajesh Sharma (Paid)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  metricCard: {
    flex: 0.48,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  metricValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginVertical: spacing.sm,
  },
  slotItem: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  slotTime: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.accent,
  },
  slotGround: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text,
    marginTop: 2,
  },
  slotCustomer: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
