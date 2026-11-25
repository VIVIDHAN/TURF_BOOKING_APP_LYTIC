import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const EarningsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings & Settlements</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Track bank settlements, payouts, and monthly statements</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.primary },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  text: { color: colors.textSecondary, fontSize: typography.sizes.sm },
});
