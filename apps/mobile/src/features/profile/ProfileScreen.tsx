import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { useAuthStore } from '../../store/authStore';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.fullName || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'guest@findmyturf.com'}</Text>
        <Text style={styles.roleBadge}>Role: {user?.role || 'CUSTOMER'}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  content: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
  },
  name: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  email: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  roleBadge: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    fontSize: typography.sizes.xs,
    color: colors.text,
  },
  logoutBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.error,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: 6,
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontWeight: typography.weights.semibold,
  },
});
