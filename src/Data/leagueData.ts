import { ITeam, IMatch } from "../App.types";
import React from "react";

interface ILeagueData {
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

  React.useEffect(() => {
    getLeagueData().then(({ teams, matches }) => {
      setTeams(teams);
      setMatches(matches);
    });
  }, []);

  return { teams, matches };
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

      return { teams, matches };
    });
}
