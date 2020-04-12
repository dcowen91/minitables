import React from "react";
import {
  CssBaseline,
  makeStyles,
  Paper,
  Chip,
  ThemeProvider,
  createMuiTheme,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";
import { NavBar } from "./Components/NavBar";
import { ITableResult, ResultsTable } from "./Components/ResultsTable";

interface ITeam {
  teamId: number;
  teamName: string;
  teamShortName: string;
}

interface IMatch {
  homeScore: number;
  awayScore: number;
  homeId: number;
  awayId: number;
}

enum PresetQueries {
  Top6,
  Big6,
  Bottom6,
  TopHalf,
  BottomHalf,
  TopHalfVsBottom,
  BottomHalfVsTop,
  All,
  Custom,
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

function calculateResults(
  team: ITeam,
  matches: IMatch[],
  filteredResults: number[]
): ITableResult {
  const teamMatches = matches.filter(
    (match) =>
      (match.awayId === team.teamId &&
        filteredResults.includes(match.homeId)) ||
      (match.homeId === team.teamId && filteredResults.includes(match.awayId))
  );

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

  return {
    teamName: team.teamName,
    teamId: team.teamId,
    wins,
    draws,
    losses,
    GD,
    points,
  };
}

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
    margin: "10px auto",
  },
  chipSection: {
    maxWidth: 270,
    display: "flex",
    flexWrap: "wrap",
    margin: 15,
    padding: 5,
  },
  box: {
    display: "flex",
  },
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  select: {
    minWidth: "200px",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [matches, setmatches] = React.useState<IMatch[]>([]);
  const [filteredVisibleTeams, setFilteredVisibleTeams] = React.useState<
    number[]
  >([]);
  const [filteredResults, setFilteredResults] = React.useState<number[]>([]);
  const [presetValue, setPresetValue] = React.useState<PresetQueries>(
    PresetQueries.All
  );

  React.useEffect(() => {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=2019–20_Premier_League&prop=text&section=7&format=json&origin=*`;
    fetch(url, { mode: "cors" })
      .then((res) => res.json())
      .then((res) => {
        const teams: ITeam[] = [];
        const matches: IMatch[] = [];

        console.log(res.parse.text["*"]);
        let domParser = new DOMParser();
        const doc = domParser.parseFromString(res.parse.text["*"], "text/xml");
        console.dir(doc);
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
        setFilteredResults(allTeamIds);
        setFilteredVisibleTeams(allTeamIds);
        setTeams(teams);
        setmatches(matches);
      });
  }, []);

  React.useEffect(() => {
    const top6 = [5, 8, 9, 10, 11, 14];
    const big6 = [0, 5, 9, 10, 11, 16];
    const bottom6 = [1, 2, 3, 13, 17, 18];
    const tophalf = [...top6, 0, 4, 16, 19];
    const bottomhalf = [...bottom6, 6, 7, 12, 15];
    const all = [...tophalf, ...bottomhalf];

    switch (presetValue) {
      case PresetQueries.Top6:
        setFilteredVisibleTeams(top6);
        setFilteredResults(top6);
        break;
      case PresetQueries.Big6:
        setFilteredVisibleTeams(big6);
        setFilteredResults(big6);
        break;
      case PresetQueries.Bottom6:
        setFilteredVisibleTeams(bottom6);
        setFilteredResults(bottom6);
        break;
      case PresetQueries.TopHalf:
        setFilteredVisibleTeams(tophalf);
        setFilteredResults(tophalf);
        break;
      case PresetQueries.BottomHalf:
        setFilteredVisibleTeams(bottomhalf);
        setFilteredResults(bottomhalf);
        break;
      case PresetQueries.TopHalfVsBottom:
        setFilteredVisibleTeams(tophalf);
        setFilteredResults(bottomhalf);
        break;
      case PresetQueries.BottomHalfVsTop:
        setFilteredVisibleTeams(bottomhalf);
        setFilteredResults(tophalf);
        break;
      case PresetQueries.All:
        setFilteredVisibleTeams(all);
        setFilteredResults(all);
        break;
      default:
        break;
    }
  }, [presetValue]);

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: deepPurple, // TODO make better theme colors
      secondary: amber,
    },
  });

  const tableResults: ITableResult[] = teams
    .map((team) => calculateResults(team, matches, filteredResults))
    .sort((first, second) => second.points - first.points)
    .filter((result) => filteredVisibleTeams.includes(result.teamId));

  // TODO add padding and make all chips the same size
  // TODO create filter section component, move interfaces to a types file
  // TODO add routing/link sharing for custom
  // TODO add "sync" button to apply changes from one chip section to other
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div className={classes.app}>
        <Box className={classes.box}>
          <Select
            value={presetValue}
            onChange={(evt) =>
              setPresetValue(evt.target.value as PresetQueries)
            }
            autoWidth
            className={classes.select}
          >
            <MenuItem value={PresetQueries.All}>All results</MenuItem>
            <MenuItem value={PresetQueries.Top6}>Top 6</MenuItem>
            <MenuItem value={PresetQueries.Big6}>Traditional Big 6</MenuItem>
            <MenuItem value={PresetQueries.Bottom6}>Bottom 6</MenuItem>
            <MenuItem value={PresetQueries.TopHalf}>Top half</MenuItem>
            <MenuItem value={PresetQueries.BottomHalf}>Bottom half</MenuItem>
            <MenuItem value={PresetQueries.TopHalfVsBottom}>
              Top half agains the bottom half
            </MenuItem>
            <MenuItem value={PresetQueries.BottomHalfVsTop}>
              Bottom half against the top half
            </MenuItem>
            <MenuItem value={PresetQueries.Custom}>Custom</MenuItem>
          </Select>
        </Box>
        <Box className={classes.box}>
          <Paper className={classes.chipSection}>
            {teams.map((team) => (
              <Chip
                key={team.teamId}
                label={team.teamShortName}
                color={
                  filteredVisibleTeams.includes(team.teamId)
                    ? "primary"
                    : undefined
                }
                onClick={() => {
                  if (filteredVisibleTeams.includes(team.teamId)) {
                    const tempResults = filteredVisibleTeams.filter(
                      (item) => item !== team.teamId
                    );
                    setFilteredVisibleTeams(tempResults);
                  } else {
                    setFilteredVisibleTeams([
                      ...filteredVisibleTeams,
                      team.teamId,
                    ]);
                  }
                  setPresetValue(PresetQueries.Custom);
                }}
              />
            ))}
          </Paper>
          <Paper className={classes.chipSection}>
            {teams.map((team) => (
              <Chip
                key={team.teamId}
                label={team.teamShortName}
                color={
                  filteredResults.includes(team.teamId) ? "primary" : undefined
                }
                onClick={() => {
                  if (filteredResults.includes(team.teamId)) {
                    const tempResults = filteredResults.filter(
                      (item) => item !== team.teamId
                    );
                    setFilteredResults(tempResults);
                  } else {
                    setFilteredResults([...filteredResults, team.teamId]);
                  }
                  setPresetValue(PresetQueries.Custom);
                }}
              />
            ))}
          </Paper>
        </Box>
        <ResultsTable results={tableResults} />
      </div>
    </ThemeProvider>
  );
};

export default App;
