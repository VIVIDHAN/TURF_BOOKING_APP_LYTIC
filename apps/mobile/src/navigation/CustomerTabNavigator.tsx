import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomerTabParamList } from './types';
import { HomeScreen } from '../features/home/HomeScreen';
import { ExploreScreen } from '../features/discovery/ExploreScreen';
import { MyBookingsScreen } from '../features/bookings/MyBookingsScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export const CustomerTabNavigator: React.FC = () => {
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{ title: 'My Bookings' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
