import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OwnerTabParamList } from './types';
import { OwnerDashboardScreen } from '../features/owner/OwnerDashboardScreen';
import { MyBookingsScreen } from '../features/bookings/MyBookingsScreen';
import { MyTurfsScreen } from '../features/owner/MyTurfsScreen';
import { EarningsScreen } from '../features/owner/EarningsScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<OwnerTabParamList>();

export const OwnerTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={OwnerDashboardScreen} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="MyTurfs" component={MyTurfsScreen} options={{ title: 'My Turfs' }} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
