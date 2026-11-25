import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { CustomerTabNavigator } from './CustomerTabNavigator';
import { OwnerTabNavigator } from './OwnerTabNavigator';
import { TurfDetailsScreen } from '../features/turf-details/TurfDetailsScreen';
import { SlotSelectionScreen } from '../features/bookings/SlotSelectionScreen';
import { PaymentSummaryScreen } from '../features/payments/PaymentSummaryScreen';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '@turf/shared-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  const isOwner = user?.role === UserRole.TURF_OWNER || user?.role === UserRole.OWNER_STAFF;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : isOwner ? (
          <Stack.Screen name="OwnerTabs" component={OwnerTabNavigator} />
        ) : (
          <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
        )}

        {/* Common stack screens */}
        <Stack.Screen
          name="TurfDetails"
          component={TurfDetailsScreen}
          options={{ headerShown: true, title: 'Venue Details' }}
        />
        <Stack.Screen
          name="SlotSelection"
          component={SlotSelectionScreen}
          options={{ headerShown: true, title: 'Pick Slot' }}
        />
        <Stack.Screen
          name="PaymentSummary"
          component={PaymentSummaryScreen}
          options={{ headerShown: true, title: 'Review & Pay' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
