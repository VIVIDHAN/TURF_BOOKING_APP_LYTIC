import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>FindMyTurf</Text>
          <Text style={styles.subTitle}>Discover & book sports turfs near you</Text>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchPlaceholder}>Search venues, areas or sports...</Text>
        </View>

        <Text style={styles.sectionTitle}>Featured Sports</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportsRow}>
          {['Cricket', 'Football', 'Badminton', 'Tennis', 'Padel'].map((sport) => (
            <TouchableOpacity key={sport} style={styles.sportChip}>
              <Text style={styles.sportChipText}>{sport}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Nearby Arenas</Text>
        <View style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.cardContent}>
            <Text style={styles.venueName}>Apex Sports Arena</Text>
            <Text style={styles.venueLocation}>Koramangala, Bengaluru • 1.4 km</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.priceText}>From ₹800 / hr</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => navigation.navigate('TurfDetails', { venueId: 'demo-venue-1' })}
              >
                <Text style={styles.bookButtonText}>Book Slot</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  brandTitle: {
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  subTitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  searchBar: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  searchPlaceholder: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sportsRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  sportChip: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  sportChipText: {
    fontSize: typography.sizes.sm,
    color: colors.text,
    fontWeight: typography.weights.medium,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  imagePlaceholder: {
    height: 140,
    backgroundColor: '#E2E8F0',
  },
  cardContent: {
    padding: spacing.md,
  },
  venueName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  venueLocation: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  priceText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.accent,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
});
