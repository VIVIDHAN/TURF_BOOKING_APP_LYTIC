import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join FindMyTurf to start booking slots</Text>
        <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, justifyContent: 'center', padding: spacing.xl },
  title: { fontSize: typography.sizes.xxl, fontWeight: typography.weights.bold, color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary, textAlign: 'center', marginVertical: spacing.md },
  linkBtn: { marginTop: spacing.md, alignItems: 'center' },
  linkText: { color: colors.primary, fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold },
});
