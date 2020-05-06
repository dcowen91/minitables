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
import { PresetQueryDataMap } from "./Data/constants";

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

function parseUrlState(
  pathName: string
): {
  preset: PresetQueries;
  visibleTeams: number[];
  visibleResults: number[];
} {
  let preset = PresetQueries.Top6;
  let visibleTeams = PresetQueryDataMap[preset]!.visible;
  let visibleResults = PresetQueryDataMap[preset]!.results;

  if (pathName !== "/") {
    const parts = pathName.split("/");
    const firstPart: string = parts[1];
    if (firstPart === PresetQueries[PresetQueries.Custom]) {
      preset = PresetQueries.Custom;
      visibleTeams = parseHash(parts[2]);
      visibleResults = parseHash(parts[3]);
    } else if (firstPart in PresetQueries) {
      preset = PresetQueries[firstPart as any] as any;
      visibleTeams = PresetQueryDataMap[preset]!.visible;
      visibleResults = PresetQueryDataMap[preset]!.results;
    }
  }
  return { preset, visibleResults, visibleTeams };
}

// TODO separate data layer from filter state
const App: React.FC = () => {
  const classes = useStyles();
  const history = createBrowserHistory();
  const { preset, visibleTeams, visibleResults } = parseUrlState(
    history.location.pathname
  );
  const [teams, _setTeams] = React.useState<ITeam[]>(StaticLeagueData.teams);
  const [matches, _setmatches] = React.useState<IMatch[]>(
    StaticLeagueData.matches
  );
  const [filteredVisibleTeams, setFilteredVisibleTeams] = React.useState<
    number[]
  >(visibleTeams);
  const [filteredResults, setFilteredResults] = React.useState<number[]>(
    visibleResults
  );
  const [presetValue, setPresetValue] = React.useState<PresetQueries>(preset);

  // on change, update URL
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
    if (presetValue !== PresetQueries.Custom) {
      const presetData = PresetQueryDataMap[presetValue];

      setFilteredVisibleTeams(presetData!.visible);
      setFilteredResults(presetData!.results);
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
      </div>
    </ThemeProvider>
  );
};

export default App;
