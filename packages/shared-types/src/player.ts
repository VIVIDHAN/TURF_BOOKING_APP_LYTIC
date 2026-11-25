import { SportType } from './enums';

export interface PlayerStats {
  id: string;
  userId: string;
  sport: SportType;
  matchesPlayed: number;
  matchesWon: number;
  tournamentsPlayed: number;
  tournamentsWon: number;
  goalsOrRuns: number;
  assistsOrWickets: number;
  mvpCount: number;
  updatedAt: Date | string;
}
