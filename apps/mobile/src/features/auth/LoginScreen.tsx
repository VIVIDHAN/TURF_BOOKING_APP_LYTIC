import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '@turf/shared-types';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((s) => s.setUser);

  const handleCustomerLogin = () => {
    setUser({
      id: 'customer-1',
      fullName: 'Siva Kumar',
      email: 'siva@example.com',
      phone: '9876543210',
      role: UserRole.CUSTOMER,
      isActive: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const handleOwnerLogin = () => {
    setUser({
      id: 'owner-1',
      fullName: 'Vividhan Turf Manager',
      email: 'owner@turf.com',
      phone: '9876500000',
      role: UserRole.TURF_OWNER,
      isActive: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FindMyTurf</Text>
        <Text style={styles.subtitle}>Sign in to book sports grounds or manage your turf</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Mobile number"
          placeholderTextColor={colors.textSecondary}
          value={identifier}
          onChangeText={setIdentifier}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleCustomerLogin}>
          <Text style={styles.primaryBtnText}>Sign In as Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleOwnerLogin}>
          <Text style={styles.secondaryBtnText}>Sign In as Turf Owner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', padding: spacing.xl },
  title: { fontSize: typography.sizes.display, fontWeight: typography.weights.bold, color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl, marginTop: spacing.xs },
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: spacing.md, marginBottom: spacing.md, fontSize: typography.sizes.sm },
  primaryBtn: { backgroundColor: colors.primary, borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  primaryBtnText: { color: '#FFFFFF', fontWeight: typography.weights.bold, fontSize: typography.sizes.sm },
  secondaryBtn: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary, borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  secondaryBtnText: { color: colors.primary, fontWeight: typography.weights.bold, fontSize: typography.sizes.sm },
  linkBtn: { marginTop: spacing.lg, alignItems: 'center' },
  linkText: { color: colors.textSecondary, fontSize: typography.sizes.xs },
});
