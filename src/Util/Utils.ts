import { IMatch, ITeam } from "./../App.types";
import { ITableResult } from "./../Components/ResultsTable";

export function filterTeamResults(
  teamId: number,
  matches: IMatch[],
  filteredTeamIds: number[]
): IMatch[] {
  return matches.filter(
    (match) =>
      (match.awayId === teamId && filteredTeamIds.includes(match.homeId)) ||
      (match.homeId === teamId && filteredTeamIds.includes(match.awayId))
  );
}

export function calculateResults(
  team: ITeam,
  matches: IMatch[],
  filteredResults: number[]
): ITableResult {
  const teamMatches = filterTeamResults(team.teamId, matches, filteredResults);

  let wins: number, draws: number, losses: number, GD: number, points: number;
  wins = draws = losses = GD = points = 0;

  teamMatches.forEach((match) => {
    const isHome = match.homeId === team.teamId;
    const teamPoints = isHome ? match.homeScore : match.awayScore;
    const oppPoints = isHome ? match.awayScore : match.homeScore;

    GD += teamPoints - oppPoints;

    if (teamPoints > oppPoints) {
      wins++;
    } else if (teamPoints === oppPoints) {
      draws++;
    } else {
      losses++;
    }
    points = wins * 3 + draws;
  });

  const pointsPerGame = Number((points / (wins + losses + draws)).toFixed(1));

  return {
    teamName: team.teamName,
    teamId: team.teamId,
    wins,
    draws,
    losses,
    GD,
    points,
    pointsPerGame,
  };
}
