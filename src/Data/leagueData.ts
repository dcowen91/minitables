import {
  ITeam,
  IMatch,
  PresetQueries,
  IQueryMap,
  ResultMap,
} from "../App.types";
import React from "react";
import { calculateResults } from "../Util/Utils";

interface ILeagueData {
  teams: ITeam[];
  matches: IMatch[];
  presetQueryMap: ResultMap;
}

interface IParsedData {
  teams: ITeam[];
  matches: IMatch[];
}

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

export function useLeagueData(): ILeagueData {
  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [matches, setMatches] = React.useState<IMatch[]>([]);
  const [presetQueryMap, setQueryMap] = React.useState<ResultMap>({
    [PresetQueries.Top6]: { visible: [], results: [] },
    [PresetQueries.Big6]: { visible: [], results: [] },
    [PresetQueries.Bottom6]: { visible: [], results: [] },
    [PresetQueries.TopHalf]: { visible: [], results: [] },
    [PresetQueries.BottomHalf]: { visible: [], results: [] },
    [PresetQueries.TopHalfVsBottom]: { visible: [], results: [] },
    [PresetQueries.BottomHalfVsTop]: { visible: [], results: [] },
    [PresetQueries.All]: { visible: [], results: [] },
  });

  React.useEffect(() => {
    getLeagueData().then(({ teams, matches }) => {
      setTeams(teams);
      setMatches(matches);

      const queryMap = buildQueryMap(teams, matches);
      setQueryMap(queryMap);
    });
  }, []);

  return { teams, matches, presetQueryMap };
}

function buildQueryMap(
  teams: ITeam[],
  matches: IMatch[]
): Partial<Record<PresetQueries, IQueryMap>> {
  const all = Array.from({ length: 20 }, (v, i) => i); // 0 to 19

  const allTeams = teams
    .map((team) => calculateResults(team, matches, all))
    .sort((a, b) => b.points - a.points)
    .map((result) => result.teamId);

  const top6: number[] = allTeams.slice(0, 6);
  const tophalf: number[] = allTeams.slice(0, 10);
  const bottom6: number[] = allTeams.slice(14, 20);
  const bottomhalf: number[] = allTeams.slice(10, 20);

  const big6 = [0, 5, 9, 10, 11, 16];

  return {
    [PresetQueries.Top6]: { visible: top6, results: top6 },
    [PresetQueries.Big6]: { visible: big6, results: big6 },
    [PresetQueries.Bottom6]: { visible: bottom6, results: bottom6 },
    [PresetQueries.TopHalf]: { visible: tophalf, results: tophalf },
    [PresetQueries.BottomHalf]: { visible: bottomhalf, results: bottomhalf },
    [PresetQueries.TopHalfVsBottom]: { visible: tophalf, results: bottomhalf },
    [PresetQueries.BottomHalfVsTop]: { visible: bottomhalf, results: tophalf },
    [PresetQueries.All]: { visible: all, results: all },
  };
}

/**
 * fetch league data and parse from wikipedia
 */
export function getLeagueData(): Promise<IParsedData> {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=2019–20_Premier_League&prop=text&section=8&format=json&origin=*`;
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

      return { teams, matches };
    });
}
