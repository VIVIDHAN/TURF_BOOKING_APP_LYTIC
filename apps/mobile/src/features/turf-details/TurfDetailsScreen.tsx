import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const TurfDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.bannerPlaceholder} />
        <View style={styles.info}>
          <Text style={styles.title}>Apex Sports Arena</Text>
          <Text style={styles.location}>Koramangala 4th Block, Bengaluru</Text>
          <Text style={styles.description}>
            State-of-the-art FIFA approved artificial turf with high-mast LED lighting,
            changing rooms, mineral water and free parking.
          </Text>

          <Text style={styles.subhead}>Available Grounds</Text>
          <View style={styles.groundCard}>
            <View>
              <Text style={styles.groundName}>Ground 1 (Football 7-a-side)</Text>
              <Text style={styles.groundPrice}>₹1,200 / hour</Text>
            </View>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() =>
                navigation.navigate('SlotSelection', {
                  groundId: 'ground-1',
                  venueName: 'Apex Sports Arena',
                })
              }
            >
              <Text style={styles.selectBtnText}>Select Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xxl },
  bannerPlaceholder: { height: 200, backgroundColor: '#CBD5E1' },
  info: { padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.primary },
  location: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 4 },
  description: { fontSize: typography.sizes.sm, color: colors.text, marginVertical: spacing.md, lineHeight: 20 },
  subhead: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.text, marginBottom: spacing.sm },
  groundCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groundName: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text },
  groundPrice: { fontSize: typography.sizes.xs, color: colors.accent, fontWeight: typography.weights.bold, marginTop: 2 },
  selectBtn: { backgroundColor: colors.primary, paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 2, borderRadius: 6 },
  selectBtnText: { color: '#FFFFFF', fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold },
});
