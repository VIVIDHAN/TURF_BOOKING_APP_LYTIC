import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const SlotSelectionScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const demoSlots = [
    { id: '1', time: '06:00 - 07:00 AM', price: 800, available: true },
    { id: '2', time: '07:00 - 08:00 AM', price: 800, available: true },
    { id: '3', time: '08:00 - 09:00 AM', price: 800, available: false },
    { id: '4', time: '06:00 - 07:00 PM', price: 1200, available: true, peak: true },
    { id: '5', time: '07:00 - 08:00 PM', price: 1200, available: true, peak: true },
    { id: '6', time: '08:00 - 09:00 PM', price: 1200, available: false, peak: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Time Slot</Text>
        <Text style={styles.subtitle}>{route.params?.venueName || 'Venue Ground'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.slotsGrid}>
        {demoSlots.map((slot) => {
          const isSelected = selectedSlot === slot.id;
          return (
            <TouchableOpacity
              key={slot.id}
              disabled={!slot.available}
              style={[
                styles.slotCard,
                !slot.available && styles.disabledSlot,
                isSelected && styles.selectedSlot,
              ]}
              onPress={() => setSelectedSlot(slot.id)}
            >
              <Text
                style={[
                  styles.slotTime,
                  !slot.available && styles.disabledText,
                  isSelected && styles.selectedText,
                ]}
              >
                {slot.time}
              </Text>
              <Text
                style={[
                  styles.slotPrice,
                  !slot.available && styles.disabledText,
                  isSelected && styles.selectedText,
                ]}
              >
                ₹{slot.price} {slot.peak ? '(Peak)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selectedSlot && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() =>
              navigation.navigate('PaymentSummary', {
                bookingId: 'demo-booking-1',
                amount: 1200,
              })
            }
          >
            <Text style={styles.continueBtnText}>Hold Slot & Pay</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.primary },
  subtitle: { fontSize: typography.sizes.xs, color: colors.textSecondary, marginTop: 2 },
  slotsGrid: { padding: spacing.md, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  slotCard: { width: '48%', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.md, marginBottom: spacing.md, alignItems: 'center' },
  disabledSlot: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0', opacity: 0.6 },
  selectedSlot: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotTime: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.text },
  slotPrice: { fontSize: typography.sizes.xs, color: colors.accent, fontWeight: typography.weights.bold, marginTop: 4 },
  disabledText: { color: '#94A3B8' },
  selectedText: { color: '#FFFFFF' },
  footer: { padding: spacing.md, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border },
  continueBtn: { backgroundColor: colors.accent, borderRadius: 8, padding: spacing.md, alignItems: 'center' },
  continueBtnText: { color: '#FFFFFF', fontWeight: typography.weights.bold, fontSize: typography.sizes.sm },
});
