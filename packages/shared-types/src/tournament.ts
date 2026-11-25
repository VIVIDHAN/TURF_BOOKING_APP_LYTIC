import { MatchStatus, SportType, TournamentFormat } from './enums';

export interface Tournament {
  id: string;
  organizerId: string;
  venueId?: string | null;
  title: string;
  description: string;
  sport: SportType;
  format: TournamentFormat;
  maxTeams: number;
  entryFee: number;
  prizePool: number;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  rules?: string | null;
  status: string;
}

export interface Team {
  id: string;
  name: string;
  logoUrl?: string | null;
  captainId: string;
  contactPhone: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  groundId?: string | null;
  teamAId: string;
  teamBId: string;
  scheduledTime: Date | string;
  status: MatchStatus;
  scoreTeamA?: string | null;
  scoreTeamB?: string | null;
  winnerTeamId?: string | null;
}
