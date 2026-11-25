import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  CustomerTabs: NavigatorScreenParams<CustomerTabParamList>;
  OwnerTabs: NavigatorScreenParams<OwnerTabParamList>;
  TurfDetails: { venueId: string };
  SlotSelection: { groundId: string; venueName: string };
  PaymentSummary: { bookingId: string; amount: number };
  TournamentDetails: { tournamentId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type CustomerTabParamList = {
  Home: undefined;
  Explore: undefined;
  MyBookings: undefined;
  Profile: undefined;
};

export type OwnerTabParamList = {
  Dashboard: undefined;
  Bookings: undefined;
  MyTurfs: undefined;
  Earnings: undefined;
  Profile: undefined;
};
