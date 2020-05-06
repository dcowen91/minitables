import React from "react";
import {
  CssBaseline,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  Typography,
} from "@material-ui/core";
import { deepPurple, amber } from "@material-ui/core/colors";
import { NavBar } from "./Components/NavBar";
import { ITableResult, ResultsTable } from "./Components/ResultsTable";
import { IMatch, ITeam, PresetQueries } from "./App.types";
import { FormSection } from "./Components/FormSection";
import { createBrowserHistory } from "history";
import { StaticLeagueData } from "./Data/leagueData";

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
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  intro: {
    marginTop: "20px",
    maxWidth: "650px",
  },
});

function parseHash(teamsHash: string): number[] {
  const result: number[] = [];
  const binary = parseInt(teamsHash, 16).toString(2).split("");
  for (let i = 20; i >= 0; i--) {
    if (binary[i]) {
      result.unshift(i);
    }
  }
  return result;
}

function convertToHash(teams: number[]): string {
  let result = 0;
  for (let i = 0; i < 20; i++) {
    const teamIsIncluded = teams.includes(i);
    result += Number(teamIsIncluded) << i;
  }
  return result.toString(16);
}

// TODO separate data layer from filter state
const App: React.FC = () => {
  const classes = useStyles();
  const [teams, _setTeams] = React.useState<ITeam[]>(StaticLeagueData.teams);
  const [matches, _setmatches] = React.useState<IMatch[]>(
    StaticLeagueData.matches
  );
  const [filteredVisibleTeams, setFilteredVisibleTeams] = React.useState<
    number[]
  >([5, 8, 9, 10, 11, 14]);
  const [filteredResults, setFilteredResults] = React.useState<number[]>([
    5,
    8,
    9,
    10,
    11,
    14,
  ]);
  const [presetValue, setPresetValue] = React.useState<PresetQueries>(
    PresetQueries.Top6
  );

  const history = createBrowserHistory();

  React.useEffect(() => {
    const pathName = history.location.pathname;
    if (pathName !== "/") {
      const parts = pathName.split("/");
      const firstPart: string = parts[1];
      if (firstPart === PresetQueries[PresetQueries.Custom]) {
        const teamNumbers = parseHash(parts[2]);
        const resultNumbers = parseHash(parts[3]);

        setPresetValue(PresetQueries.Custom);
        setFilteredVisibleTeams(teamNumbers);
        setFilteredResults(resultNumbers);
      } else if (firstPart in PresetQueries) {
        // TODO this works but there is a redirect flicker -> how to fix?
        setPresetValue(PresetQueries[firstPart as any] as any);
      }
    }
  }, []);

  React.useEffect(() => {
    if (presetValue !== PresetQueries.Custom) {
      history.replace(`/${PresetQueries[presetValue]}`);
    } else {
      const teamHash = convertToHash(filteredVisibleTeams);
      const resultHash = convertToHash(filteredResults);

      const path = `/${PresetQueries[presetValue]}/${teamHash}/${resultHash}`;
      history.replace(path);
    }
  }, [presetValue, filteredResults, filteredVisibleTeams]);

  // If the PL ever resumes, then this will be needed
  // React.useEffect(() => {
  //   getLeagueData().then(({ allTeamIds, teams, matches }) => {
  //     setFilteredResults(allTeamIds);
  //     setFilteredVisibleTeams(allTeamIds);
  //     setTeams(teams);
  //     setmatches(matches);
  //   });
  // }, []);

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

  // TODO create filter section component, move interfaces to a types file
  // TODO add routing/link sharing for custom
  // TODO add "sync" button to apply changes from one chip section to other
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div className={classes.app}>
        <Typography className={classes.intro}>
          Minitables lets you compare small league results for the Premier
          League. Select an item from the preset to look at results only between
          the top 6 teams, or the traditional big 6. Or click on the chips to
          create your own mini league table!
        </Typography>
        {teams.length > 0 && (
          <>
            <FormSection
              teams={teams}
              filteredResults={filteredResults}
              filteredVisibleTeams={filteredVisibleTeams}
              presetValue={presetValue}
              setFilteredResults={setFilteredResults}
              setFilteredVisibleTeams={setFilteredVisibleTeams}
              setPresetValue={setPresetValue}
            />
            <ResultsTable results={tableResults} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
