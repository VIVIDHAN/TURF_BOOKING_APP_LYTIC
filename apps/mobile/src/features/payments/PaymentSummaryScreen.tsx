import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const PaymentSummaryScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const baseAmount = route.params?.amount || 1200;
  const convenienceFee = Math.round(baseAmount * 0.025);
  const gst = Math.round((baseAmount + convenienceFee) * 0.18);
  const totalPayable = baseAmount + convenienceFee + gst;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Summary</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bill Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Slot Fee</Text>
            <Text style={styles.value}>₹{baseAmount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Platform Convenience Fee (2.5%)</Text>
            <Text style={styles.value}>₹{convenienceFee}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>GST (18%)</Text>
            <Text style={styles.value}>₹{gst}</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{totalPayable}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => {
            alert('Payment Successful via Razorpay!');
            navigation.navigate('CustomerTabs', { screen: 'MyBookings' });
          }}
        >
          <Text style={styles.payBtnText}>Pay ₹{totalPayable} via Razorpay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.primary },
  content: { padding: spacing.md },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.md, marginBottom: spacing.lg },
  cardTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.text, marginBottom: spacing.md },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  label: { fontSize: typography.sizes.xs, color: colors.textSecondary },
  value: { fontSize: typography.sizes.xs, color: colors.text, fontWeight: typography.weights.medium },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.xs },
  totalLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.text },
  totalValue: { fontSize: typography.sizes.md, fontWeight: typography.weights.bold, color: colors.accent },
  payBtn: { backgroundColor: colors.accent, borderRadius: 8, padding: spacing.md, alignItems: 'center' },
  payBtnText: { color: '#FFFFFF', fontWeight: typography.weights.bold, fontSize: typography.sizes.sm },
});
