import { ITeam, IMatch } from "../App.types";

interface ILeagueData {
  allTeamIds: number[];
  teams: ITeam[];
  matches: IMatch[];
}

export const StaticLeagueData: ILeagueData = {
  allTeamIds: [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
  ],
  teams: [
    { teamName: "Arsenal", teamId: 0, teamShortName: "ARS" },
    { teamName: "Aston Villa", teamId: 1, teamShortName: "AVL" },
    { teamName: "Bournemouth", teamId: 2, teamShortName: "BOU" },
    { teamName: "Brighton & Hove Albion", teamId: 3, teamShortName: "BHA" },
    { teamName: "Burnley", teamId: 4, teamShortName: "BUR" },
    { teamName: "Chelsea", teamId: 5, teamShortName: "CHE" },
    { teamName: "Crystal Palace", teamId: 6, teamShortName: "CRY" },
    { teamName: "Everton", teamId: 7, teamShortName: "EVE" },
    { teamName: "Leicester City", teamId: 8, teamShortName: "LEI" },
    { teamName: "Liverpool", teamId: 9, teamShortName: "LIV" },
    { teamName: "Manchester City", teamId: 10, teamShortName: "MCI" },
    { teamName: "Manchester United", teamId: 11, teamShortName: "MUN" },
    { teamName: "Newcastle United", teamId: 12, teamShortName: "NEW" },
    { teamName: "Norwich City", teamId: 13, teamShortName: "NOR" },
    { teamName: "Sheffield United", teamId: 14, teamShortName: "SHU" },
    { teamName: "Southampton", teamId: 15, teamShortName: "SOU" },
    { teamName: "Tottenham Hotspur", teamId: 16, teamShortName: "TOT" },
    { teamName: "Watford", teamId: 17, teamShortName: "WAT" },
    { teamName: "West Ham United", teamId: 18, teamShortName: "WHU" },
    { teamName: "Wolverhampton Wanderers", teamId: 19, teamShortName: "WOL" },
  ],
  matches: [
    { homeScore: 3, awayScore: 2, homeId: 0, awayId: 1 },
    { homeScore: 1, awayScore: 0, homeId: 0, awayId: 2 },
    { homeScore: 1, awayScore: 2, homeId: 0, awayId: 3 },
    { homeScore: 2, awayScore: 1, homeId: 0, awayId: 4 },
    { homeScore: 1, awayScore: 2, homeId: 0, awayId: 5 },
    { homeScore: 2, awayScore: 2, homeId: 0, awayId: 6 },
    { homeScore: 3, awayScore: 2, homeId: 0, awayId: 7 },
    { homeScore: 0, awayScore: 3, homeId: 0, awayId: 10 },
    { homeScore: 2, awayScore: 0, homeId: 0, awayId: 11 },
    { homeScore: 4, awayScore: 0, homeId: 0, awayId: 12 },
    { homeScore: 1, awayScore: 1, homeId: 0, awayId: 14 },
    { homeScore: 2, awayScore: 2, homeId: 0, awayId: 15 },
    { homeScore: 2, awayScore: 2, homeId: 0, awayId: 16 },
    { homeScore: 1, awayScore: 0, homeId: 0, awayId: 18 },
    { homeScore: 1, awayScore: 1, homeId: 0, awayId: 19 },
    { homeScore: 1, awayScore: 2, homeId: 1, awayId: 2 },
    { homeScore: 2, awayScore: 1, homeId: 1, awayId: 3 },
    { homeScore: 2, awayScore: 2, homeId: 1, awayId: 4 },
    { homeScore: 2, awayScore: 0, homeId: 1, awayId: 7 },
    { homeScore: 1, awayScore: 4, homeId: 1, awayId: 8 },
    { homeScore: 1, awayScore: 2, homeId: 1, awayId: 9 },
    { homeScore: 1, awayScore: 6, homeId: 1, awayId: 10 },
    { homeScore: 2, awayScore: 0, homeId: 1, awayId: 12 },
    { homeScore: 1, awayScore: 0, homeId: 1, awayId: 13 },
    { homeScore: 1, awayScore: 3, homeId: 1, awayId: 15 },
    { homeScore: 2, awayScore: 3, homeId: 1, awayId: 16 },
    { homeScore: 2, awayScore: 1, homeId: 1, awayId: 17 },
    { homeScore: 0, awayScore: 0, homeId: 1, awayId: 18 },
    { homeScore: 1, awayScore: 1, homeId: 2, awayId: 0 },
    { homeScore: 2, awayScore: 1, homeId: 2, awayId: 1 },
    { homeScore: 3, awayScore: 1, homeId: 2, awayId: 3 },
    { homeScore: 0, awayScore: 1, homeId: 2, awayId: 4 },
    { homeScore: 2, awayScore: 2, homeId: 2, awayId: 5 },
    { homeScore: 3, awayScore: 1, homeId: 2, awayId: 7 },
    { homeScore: 0, awayScore: 3, homeId: 2, awayId: 9 },
    { homeScore: 1, awayScore: 3, homeId: 2, awayId: 10 },
    { homeScore: 1, awayScore: 0, homeId: 2, awayId: 11 },
    { homeScore: 0, awayScore: 0, homeId: 2, awayId: 13 },
    { homeScore: 1, awayScore: 1, homeId: 2, awayId: 14 },
    { homeScore: 0, awayScore: 3, homeId: 2, awayId: 17 },
    { homeScore: 2, awayScore: 2, homeId: 2, awayId: 18 },
    { homeScore: 1, awayScore: 2, homeId: 2, awayId: 19 },
    { homeScore: 1, awayScore: 1, homeId: 3, awayId: 1 },
    { homeScore: 2, awayScore: 0, homeId: 3, awayId: 2 },
    { homeScore: 1, awayScore: 1, homeId: 3, awayId: 4 },
    { homeScore: 1, awayScore: 1, homeId: 3, awayId: 5 },
    { homeScore: 0, awayScore: 1, homeId: 3, awayId: 6 },
    { homeScore: 3, awayScore: 2, homeId: 3, awayId: 7 },
    { homeScore: 0, awayScore: 2, homeId: 3, awayId: 8 },
    { homeScore: 2, awayScore: 0, homeId: 3, awayId: 13 },
    { homeScore: 0, awayScore: 1, homeId: 3, awayId: 14 },
    { homeScore: 0, awayScore: 2, homeId: 3, awayId: 15 },
    { homeScore: 3, awayScore: 0, homeId: 3, awayId: 16 },
    { homeScore: 1, awayScore: 1, homeId: 3, awayId: 17 },
    { homeScore: 1, awayScore: 1, homeId: 3, awayId: 18 },
    { homeScore: 2, awayScore: 2, homeId: 3, awayId: 19 },
    { homeScore: 0, awayScore: 0, homeId: 4, awayId: 0 },
    { homeScore: 1, awayScore: 2, homeId: 4, awayId: 1 },
    { homeScore: 3, awayScore: 0, homeId: 4, awayId: 2 },
    { homeScore: 2, awayScore: 4, homeId: 4, awayId: 5 },
    { homeScore: 0, awayScore: 2, homeId: 4, awayId: 6 },
    { homeScore: 1, awayScore: 0, homeId: 4, awayId: 7 },
    { homeScore: 2, awayScore: 1, homeId: 4, awayId: 8 },
    { homeScore: 0, awayScore: 3, homeId: 4, awayId: 9 },
    { homeScore: 1, awayScore: 4, homeId: 4, awayId: 10 },
    { homeScore: 0, awayScore: 2, homeId: 4, awayId: 11 },
    { homeScore: 1, awayScore: 0, homeId: 4, awayId: 12 },
    { homeScore: 2, awayScore: 0, homeId: 4, awayId: 13 },
    { homeScore: 3, awayScore: 0, homeId: 4, awayId: 15 },
    { homeScore: 1, awayScore: 1, homeId: 4, awayId: 16 },
    { homeScore: 3, awayScore: 0, homeId: 4, awayId: 18 },
    { homeScore: 2, awayScore: 2, homeId: 5, awayId: 0 },
    { homeScore: 2, awayScore: 1, homeId: 5, awayId: 1 },
    { homeScore: 0, awayScore: 1, homeId: 5, awayId: 2 },
    { homeScore: 2, awayScore: 0, homeId: 5, awayId: 3 },
    { homeScore: 3, awayScore: 0, homeId: 5, awayId: 4 },
    { homeScore: 2, awayScore: 0, homeId: 5, awayId: 6 },
    { homeScore: 4, awayScore: 0, homeId: 5, awayId: 7 },
    { homeScore: 1, awayScore: 1, homeId: 5, awayId: 8 },
    { homeScore: 1, awayScore: 2, homeId: 5, awayId: 9 },
    { homeScore: 0, awayScore: 2, homeId: 5, awayId: 11 },
    { homeScore: 1, awayScore: 0, homeId: 5, awayId: 12 },
    { homeScore: 2, awayScore: 2, homeId: 5, awayId: 14 },
    { homeScore: 0, awayScore: 2, homeId: 5, awayId: 15 },
    { homeScore: 2, awayScore: 1, homeId: 5, awayId: 16 },
    { homeScore: 0, awayScore: 1, homeId: 5, awayId: 18 },
    { homeScore: 1, awayScore: 1, homeId: 6, awayId: 0 },
    { homeScore: 1, awayScore: 0, homeId: 6, awayId: 1 },
    { homeScore: 1, awayScore: 0, homeId: 6, awayId: 2 },
    { homeScore: 1, awayScore: 1, homeId: 6, awayId: 3 },
    { homeScore: 0, awayScore: 0, homeId: 6, awayId: 7 },
    { homeScore: 0, awayScore: 2, homeId: 6, awayId: 8 },
    { homeScore: 1, awayScore: 2, homeId: 6, awayId: 9 },
    { homeScore: 0, awayScore: 2, homeId: 6, awayId: 10 },
    { homeScore: 1, awayScore: 0, homeId: 6, awayId: 12 },
    { homeScore: 2, awayScore: 0, homeId: 6, awayId: 13 },
    { homeScore: 0, awayScore: 1, homeId: 6, awayId: 14 },
    { homeScore: 0, awayScore: 2, homeId: 6, awayId: 15 },
    { homeScore: 1, awayScore: 0, homeId: 6, awayId: 17 },
    { homeScore: 2, awayScore: 1, homeId: 6, awayId: 18 },
    { homeScore: 1, awayScore: 1, homeId: 6, awayId: 19 },
    { homeScore: 0, awayScore: 0, homeId: 7, awayId: 0 },
    { homeScore: 1, awayScore: 0, homeId: 7, awayId: 3 },
    { homeScore: 1, awayScore: 0, homeId: 7, awayId: 4 },
    { homeScore: 3, awayScore: 1, homeId: 7, awayId: 5 },
    { homeScore: 3, awayScore: 1, homeId: 7, awayId: 6 },
    { homeScore: 1, awayScore: 3, homeId: 7, awayId: 10 },
    { homeScore: 1, awayScore: 1, homeId: 7, awayId: 11 },
    { homeScore: 2, awayScore: 2, homeId: 7, awayId: 12 },
    { homeScore: 0, awayScore: 2, homeId: 7, awayId: 13 },
    { homeScore: 0, awayScore: 2, homeId: 7, awayId: 14 },
    { homeScore: 1, awayScore: 1, homeId: 7, awayId: 16 },
    { homeScore: 1, awayScore: 0, homeId: 7, awayId: 17 },
    { homeScore: 2, awayScore: 0, homeId: 7, awayId: 18 },
    { homeScore: 3, awayScore: 2, homeId: 7, awayId: 19 },
    { homeScore: 2, awayScore: 0, homeId: 8, awayId: 0 },
    { homeScore: 4, awayScore: 0, homeId: 8, awayId: 1 },
    { homeScore: 3, awayScore: 1, homeId: 8, awayId: 2 },
    { homeScore: 2, awayScore: 1, homeId: 8, awayId: 4 },
    { homeScore: 2, awayScore: 2, homeId: 8, awayId: 5 },
    { homeScore: 2, awayScore: 1, homeId: 8, awayId: 7 },
    { homeScore: 0, awayScore: 4, homeId: 8, awayId: 9 },
    { homeScore: 0, awayScore: 1, homeId: 8, awayId: 10 },
    { homeScore: 5, awayScore: 0, homeId: 8, awayId: 12 },
    { homeScore: 1, awayScore: 1, homeId: 8, awayId: 13 },
    { homeScore: 1, awayScore: 2, homeId: 8, awayId: 15 },
    { homeScore: 2, awayScore: 1, homeId: 8, awayId: 16 },
    { homeScore: 2, awayScore: 0, homeId: 8, awayId: 17 },
    { homeScore: 4, awayScore: 1, homeId: 8, awayId: 18 },
    { homeScore: 0, awayScore: 0, homeId: 8, awayId: 19 },
    { homeScore: 3, awayScore: 1, homeId: 9, awayId: 0 },
    { homeScore: 2, awayScore: 1, homeId: 9, awayId: 2 },
    { homeScore: 2, awayScore: 1, homeId: 9, awayId: 3 },
    { homeScore: 5, awayScore: 2, homeId: 9, awayId: 7 },
    { homeScore: 2, awayScore: 1, homeId: 9, awayId: 8 },
    { homeScore: 3, awayScore: 1, homeId: 9, awayId: 10 },
    { homeScore: 2, awayScore: 0, homeId: 9, awayId: 11 },
    { homeScore: 3, awayScore: 1, homeId: 9, awayId: 12 },
    { homeScore: 4, awayScore: 1, homeId: 9, awayId: 13 },
    { homeScore: 2, awayScore: 0, homeId: 9, awayId: 14 },
    { homeScore: 4, awayScore: 0, homeId: 9, awayId: 15 },
    { homeScore: 2, awayScore: 1, homeId: 9, awayId: 16 },
    { homeScore: 2, awayScore: 0, homeId: 9, awayId: 17 },
    { homeScore: 3, awayScore: 2, homeId: 9, awayId: 18 },
    { homeScore: 1, awayScore: 0, homeId: 9, awayId: 19 },
    { homeScore: 3, awayScore: 0, homeId: 10, awayId: 1 },
    { homeScore: 4, awayScore: 0, homeId: 10, awayId: 3 },
    { homeScore: 2, awayScore: 1, homeId: 10, awayId: 5 },
    { homeScore: 2, awayScore: 2, homeId: 10, awayId: 6 },
    { homeScore: 2, awayScore: 1, homeId: 10, awayId: 7 },
    { homeScore: 3, awayScore: 1, homeId: 10, awayId: 8 },
    { homeScore: 1, awayScore: 2, homeId: 10, awayId: 11 },
    { homeScore: 2, awayScore: 0, homeId: 10, awayId: 14 },
    { homeScore: 2, awayScore: 1, homeId: 10, awayId: 15 },
    { homeScore: 2, awayScore: 2, homeId: 10, awayId: 16 },
    { homeScore: 8, awayScore: 0, homeId: 10, awayId: 17 },
    { homeScore: 2, awayScore: 0, homeId: 10, awayId: 18 },
    { homeScore: 0, awayScore: 2, homeId: 10, awayId: 19 },
    { homeScore: 1, awayScore: 1, homeId: 11, awayId: 0 },
    { homeScore: 2, awayScore: 2, homeId: 11, awayId: 1 },
    { homeScore: 3, awayScore: 1, homeId: 11, awayId: 3 },
    { homeScore: 0, awayScore: 2, homeId: 11, awayId: 4 },
    { homeScore: 4, awayScore: 0, homeId: 11, awayId: 5 },
    { homeScore: 1, awayScore: 2, homeId: 11, awayId: 6 },
    { homeScore: 1, awayScore: 1, homeId: 11, awayId: 7 },
    { homeScore: 1, awayScore: 0, homeId: 11, awayId: 8 },
    { homeScore: 1, awayScore: 1, homeId: 11, awayId: 9 },
    { homeScore: 2, awayScore: 0, homeId: 11, awayId: 10 },
    { homeScore: 4, awayScore: 1, homeId: 11, awayId: 12 },
    { homeScore: 4, awayScore: 0, homeId: 11, awayId: 13 },
    { homeScore: 2, awayScore: 1, homeId: 11, awayId: 16 },
    { homeScore: 3, awayScore: 0, homeId: 11, awayId: 17 },
    { homeScore: 0, awayScore: 0, homeId: 11, awayId: 19 },
    { homeScore: 0, awayScore: 1, homeId: 12, awayId: 0 },
    { homeScore: 2, awayScore: 1, homeId: 12, awayId: 2 },
    { homeScore: 0, awayScore: 0, homeId: 12, awayId: 3 },
    { homeScore: 0, awayScore: 0, homeId: 12, awayId: 4 },
    { homeScore: 1, awayScore: 0, homeId: 12, awayId: 5 },
    { homeScore: 1, awayScore: 0, homeId: 12, awayId: 6 },
    { homeScore: 1, awayScore: 2, homeId: 12, awayId: 7 },
    { homeScore: 0, awayScore: 3, homeId: 12, awayId: 8 },
    { homeScore: 2, awayScore: 2, homeId: 12, awayId: 10 },
    { homeScore: 1, awayScore: 0, homeId: 12, awayId: 11 },
    { homeScore: 0, awayScore: 0, homeId: 12, awayId: 13 },
    { homeScore: 2, awayScore: 1, homeId: 12, awayId: 15 },
    { homeScore: 1, awayScore: 1, homeId: 12, awayId: 17 },
    { homeScore: 1, awayScore: 1, homeId: 12, awayId: 19 },
    { homeScore: 2, awayScore: 2, homeId: 13, awayId: 0 },
    { homeScore: 1, awayScore: 5, homeId: 13, awayId: 1 },
    { homeScore: 1, awayScore: 0, homeId: 13, awayId: 2 },
    { homeScore: 2, awayScore: 3, homeId: 13, awayId: 5 },
    { homeScore: 1, awayScore: 1, homeId: 13, awayId: 6 },
    { homeScore: 1, awayScore: 0, homeId: 13, awayId: 8 },
    { homeScore: 0, awayScore: 1, homeId: 13, awayId: 9 },
    { homeScore: 3, awayScore: 2, homeId: 13, awayId: 10 },
    { homeScore: 1, awayScore: 3, homeId: 13, awayId: 11 },
    { homeScore: 3, awayScore: 1, homeId: 13, awayId: 12 },
    { homeScore: 1, awayScore: 2, homeId: 13, awayId: 14 },
    { homeScore: 2, awayScore: 2, homeId: 13, awayId: 16 },
    { homeScore: 0, awayScore: 2, homeId: 13, awayId: 17 },
    { homeScore: 1, awayScore: 2, homeId: 13, awayId: 19 },
    { homeScore: 1, awayScore: 0, homeId: 14, awayId: 0 },
    { homeScore: 2, awayScore: 0, homeId: 14, awayId: 1 },
    { homeScore: 2, awayScore: 1, homeId: 14, awayId: 2 },
    { homeScore: 1, awayScore: 1, homeId: 14, awayId: 3 },
    { homeScore: 3, awayScore: 0, homeId: 14, awayId: 4 },
    { homeScore: 1, awayScore: 0, homeId: 14, awayId: 6 },
    { homeScore: 1, awayScore: 2, homeId: 14, awayId: 8 },
    { homeScore: 0, awayScore: 1, homeId: 14, awayId: 9 },
    { homeScore: 0, awayScore: 1, homeId: 14, awayId: 10 },
    { homeScore: 3, awayScore: 3, homeId: 14, awayId: 11 },
    { homeScore: 0, awayScore: 2, homeId: 14, awayId: 12 },
    { homeScore: 1, awayScore: 0, homeId: 14, awayId: 13 },
    { homeScore: 0, awayScore: 1, homeId: 14, awayId: 15 },
    { homeScore: 1, awayScore: 1, homeId: 14, awayId: 17 },
    { homeScore: 1, awayScore: 0, homeId: 14, awayId: 18 },
    { homeScore: 2, awayScore: 0, homeId: 15, awayId: 1 },
    { homeScore: 1, awayScore: 3, homeId: 15, awayId: 2 },
    { homeScore: 1, awayScore: 2, homeId: 15, awayId: 4 },
    { homeScore: 1, awayScore: 4, homeId: 15, awayId: 5 },
    { homeScore: 1, awayScore: 1, homeId: 15, awayId: 6 },
    { homeScore: 1, awayScore: 2, homeId: 15, awayId: 7 },
    { homeScore: 0, awayScore: 9, homeId: 15, awayId: 8 },
    { homeScore: 1, awayScore: 2, homeId: 15, awayId: 9 },
    { homeScore: 1, awayScore: 1, homeId: 15, awayId: 11 },
    { homeScore: 0, awayScore: 1, homeId: 15, awayId: 12 },
    { homeScore: 2, awayScore: 1, homeId: 15, awayId: 13 },
    { homeScore: 1, awayScore: 0, homeId: 15, awayId: 16 },
    { homeScore: 2, awayScore: 1, homeId: 15, awayId: 17 },
    { homeScore: 0, awayScore: 1, homeId: 15, awayId: 18 },
    { homeScore: 2, awayScore: 3, homeId: 15, awayId: 19 },
    { homeScore: 3, awayScore: 1, homeId: 16, awayId: 1 },
    { homeScore: 3, awayScore: 2, homeId: 16, awayId: 2 },
    { homeScore: 2, awayScore: 1, homeId: 16, awayId: 3 },
    { homeScore: 5, awayScore: 0, homeId: 16, awayId: 4 },
    { homeScore: 0, awayScore: 2, homeId: 16, awayId: 5 },
    { homeScore: 4, awayScore: 0, homeId: 16, awayId: 6 },
    { homeScore: 0, awayScore: 1, homeId: 16, awayId: 9 },
    { homeScore: 2, awayScore: 0, homeId: 16, awayId: 10 },
    { homeScore: 0, awayScore: 1, homeId: 16, awayId: 12 },
    { homeScore: 2, awayScore: 1, homeId: 16, awayId: 13 },
    { homeScore: 1, awayScore: 1, homeId: 16, awayId: 14 },
    { homeScore: 2, awayScore: 1, homeId: 16, awayId: 15 },
    { homeScore: 1, awayScore: 1, homeId: 16, awayId: 17 },
    { homeScore: 2, awayScore: 3, homeId: 16, awayId: 19 },
    { homeScore: 2, awayScore: 2, homeId: 17, awayId: 0 },
    { homeScore: 3, awayScore: 0, homeId: 17, awayId: 1 },
    { homeScore: 0, awayScore: 0, homeId: 17, awayId: 2 },
    { homeScore: 0, awayScore: 3, homeId: 17, awayId: 3 },
    { homeScore: 0, awayScore: 3, homeId: 17, awayId: 4 },
    { homeScore: 1, awayScore: 2, homeId: 17, awayId: 5 },
    { homeScore: 0, awayScore: 0, homeId: 17, awayId: 6 },
    { homeScore: 2, awayScore: 3, homeId: 17, awayId: 7 },
    { homeScore: 3, awayScore: 0, homeId: 17, awayId: 9 },
    { homeScore: 2, awayScore: 0, homeId: 17, awayId: 11 },
    { homeScore: 0, awayScore: 0, homeId: 17, awayId: 14 },
    { homeScore: 0, awayScore: 0, homeId: 17, awayId: 16 },
    { homeScore: 1, awayScore: 3, homeId: 17, awayId: 18 },
    { homeScore: 2, awayScore: 1, homeId: 17, awayId: 19 },
    { homeScore: 1, awayScore: 3, homeId: 18, awayId: 0 },
    { homeScore: 4, awayScore: 0, homeId: 18, awayId: 2 },
    { homeScore: 3, awayScore: 3, homeId: 18, awayId: 3 },
    { homeScore: 1, awayScore: 2, homeId: 18, awayId: 6 },
    { homeScore: 1, awayScore: 1, homeId: 18, awayId: 7 },
    { homeScore: 1, awayScore: 2, homeId: 18, awayId: 8 },
    { homeScore: 0, awayScore: 2, homeId: 18, awayId: 9 },
    { homeScore: 0, awayScore: 5, homeId: 18, awayId: 10 },
    { homeScore: 2, awayScore: 0, homeId: 18, awayId: 11 },
    { homeScore: 2, awayScore: 3, homeId: 18, awayId: 12 },
    { homeScore: 2, awayScore: 0, homeId: 18, awayId: 13 },
    { homeScore: 1, awayScore: 1, homeId: 18, awayId: 14 },
    { homeScore: 3, awayScore: 1, homeId: 18, awayId: 15 },
    { homeScore: 2, awayScore: 3, homeId: 18, awayId: 16 },
    { homeScore: 2, awayScore: 1, homeId: 19, awayId: 1 },
    { homeScore: 0, awayScore: 0, homeId: 19, awayId: 3 },
    { homeScore: 1, awayScore: 1, homeId: 19, awayId: 4 },
    { homeScore: 2, awayScore: 5, homeId: 19, awayId: 5 },
    { homeScore: 0, awayScore: 0, homeId: 19, awayId: 8 },
    { homeScore: 1, awayScore: 2, homeId: 19, awayId: 9 },
    { homeScore: 3, awayScore: 2, homeId: 19, awayId: 10 },
    { homeScore: 1, awayScore: 1, homeId: 19, awayId: 11 },
    { homeScore: 1, awayScore: 1, homeId: 19, awayId: 12 },
    { homeScore: 3, awayScore: 0, homeId: 19, awayId: 13 },
    { homeScore: 1, awayScore: 1, homeId: 19, awayId: 14 },
    { homeScore: 1, awayScore: 1, homeId: 19, awayId: 15 },
    { homeScore: 1, awayScore: 2, homeId: 19, awayId: 16 },
    { homeScore: 2, awayScore: 0, homeId: 19, awayId: 17 },
    { homeScore: 2, awayScore: 0, homeId: 19, awayId: 18 },
  ],
};

function transformMatchResult(
  value: string | null | undefined,
  team1Id: number,
  team2Id: number
): IMatch | undefined {
  if (
    !value ||
    !value.trim() ||
    value.trim() === "a" ||
    value.trim() === "\\n" ||
    value.trim() === "—"
  ) {
    return undefined;
  }
  const [team1Score, team2Score] = value.trim().split("–").map(Number);

  return {
    homeScore: team1Score,
    awayScore: team2Score,
    homeId: team1Id,
    awayId: team2Id,
  };
}

/**
 * fetch league data and parse from wikipedia
 */
export function getLeagueData(): Promise<ILeagueData> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=2019–20_Premier_League&prop=text&section=7&format=json&origin=*`;
  return fetch(url, { mode: "cors" })
    .then((res) => res.json())
    .then((res) => {
      const teams: ITeam[] = [];
      const matches: IMatch[] = [];

      let domParser = new DOMParser();
      const doc = domParser.parseFromString(res.parse.text["*"], "text/xml");
      const table = doc.querySelector("table");
      table?.querySelectorAll("tr").forEach((tr, index) => {
        if (index === 0) {
          // Parse header row -> extract teams
          const anchors = tr.querySelectorAll("a");
          anchors.forEach((anchor, index) => {
            const team: ITeam = {
              teamName:
                anchor
                  .getAttribute("title")
                  ?.replace("A.F.C.", "")
                  ?.replace("F.C.", "")
                  .trim() ?? "",
              teamId: index,
              teamShortName: anchor.innerHTML,
            };
            teams.push(team);
          });
        } else {
          // parse non-header row -> extract match;
          const cells = tr.querySelectorAll("td");
          cells.forEach((cell, innerIndex) => {
            const child = cell.firstChild;
            let result: IMatch | undefined;

            if (child?.lastChild) {
              result = transformMatchResult(
                child.lastChild?.nodeValue,
                index - 1,
                innerIndex
              );
            } else {
              result = transformMatchResult(
                child?.nodeValue,
                index - 1,
                innerIndex
              );
            }

            if (result) {
              matches.push(result);
            }
          });
        }
      });

      const allTeamIds = teams.map((team) => team.teamId);

      return { allTeamIds, teams, matches };
    });
}
