import React from "react";
import {
  CssBaseline,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  makeStyles,
  Paper,
  Chip,
  ThemeProvider,
  createMuiTheme,
  Box
} from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";

// TODO break up this monolithic class
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

interface ITableResult {
  teamId: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  GD: number;
  points: number;
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
  const [team1Score, team2Score] = value
    .trim()
    .split("–")
    .map(Number);

  return {
    homeScore: team1Score,
    awayScore: team2Score,
    homeId: team1Id,
    awayId: team2Id
  };
}

/**
 * TODO add filtering logic
 */
function calculateResults(
  team: ITeam,
  matches: IMatch[],
  filteredResults: number[]
): ITableResult {
  // TODO fix filter. if team is HOME, then
  const teamMatches = matches.filter(
    match =>
      (match.awayId === team.teamId &&
        filteredResults.includes(match.homeId)) ||
      (match.homeId === team.teamId && filteredResults.includes(match.awayId))
  );

  let wins: number, draws: number, losses: number, GD: number, points: number;
  wins = draws = losses = GD = points = 0;

  teamMatches.forEach(match => {
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
    points
  };
}

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
    margin: "10px auto"
  },
  chipSection: {
    maxWidth: 270,
    display: "flex",
    flexWrap: "wrap",
    margin: 15,
    padding: 5
  },
  box: {
    display: "flex"
  },
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  const [teams, setTeams] = React.useState<ITeam[]>([]);
  const [matches, setmatches] = React.useState<IMatch[]>([]);
  const [filteredVisibleTeams, setFilteredVisibleTeams] = React.useState<
    number[]
  >([]);
  const [filteredResults, setFilteredResults] = React.useState<number[]>([]);

  React.useEffect(() => {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=2019–20_Premier_League&prop=text&section=7&format=json&origin=*`;
    fetch(url, { mode: "cors" })
      .then(res => res.json())
      .then(res => {
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
                teamShortName: anchor.innerHTML
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

        const allTeamIds = teams.map(team => team.teamId);
        setFilteredResults(allTeamIds);
        setFilteredVisibleTeams(allTeamIds);
        setTeams(teams);
        setmatches(matches);
      });
  }, []);
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: deepPurple,
      secondary: amber
    }
  });

  // TODO add click functionality for the chiops
  // TODO add padding and make all chips the same size
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <CssBaseline />
        <Box className={classes.box}>
          <Paper className={classes.chipSection}>
            {teams.map(team => (
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
                      item => item !== team.teamId
                    );
                    setFilteredVisibleTeams(tempResults);
                  } else {
                    setFilteredVisibleTeams([
                      ...filteredVisibleTeams,
                      team.teamId
                    ]);
                  }
                }}
              />
            ))}
          </Paper>
          <Paper className={classes.chipSection}>
            {teams.map(team => (
              <Chip
                key={team.teamId}
                label={team.teamShortName}
                color={
                  filteredResults.includes(team.teamId) ? "primary" : undefined
                }
                onClick={() => {
                  if (filteredResults.includes(team.teamId)) {
                    const tempResults = filteredResults.filter(
                      item => item !== team.teamId
                    );
                    setFilteredResults(tempResults);
                  } else {
                    setFilteredResults([...filteredResults, team.teamId]);
                  }
                }}
              />
            ))}
          </Paper>
        </Box>
        <TableContainer className={classes.table} component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>W</TableCell>
                <TableCell>D</TableCell>
                <TableCell>L</TableCell>
                <TableCell>GD</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            </TableHead>
            {teams
              .map(team => calculateResults(team, matches, filteredResults))
              .sort((first, second) => second.points - first.points)
              .filter(result => filteredVisibleTeams.includes(result.teamId))
              .map(result => {
                return (
                  <TableRow>
                    <TableCell>{result.teamName}</TableCell>
                    <TableCell>{result.wins}</TableCell>
                    <TableCell>{result.draws}</TableCell>
                    <TableCell>{result.losses}</TableCell>
                    <TableCell>{result.GD}</TableCell>
                    <TableCell>{result.points}</TableCell>
                  </TableRow>
                );
              })}
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
};

export default App;
