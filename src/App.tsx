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
import { IMatch, ITeam, PresetQueries, ResultMap } from "./App.types";
import { FormSection } from "./Components/FormSection";
import { createBrowserHistory } from "history";
import { useLeagueData } from "./Data/leagueData";
import {
  TeamResultsModal,
  ITeamResults,
  IMatchResult,
} from "./Components/TeamResultsModal";
import { calculateResults, filterTeamResults } from "./Util/Utils";

function buildMatchResult(
  isHome: boolean,
  match?: IMatch
): IMatchResult | undefined {
  if (!match) {
    return;
  }

  const result =
    match.awayScore === match.homeScore
      ? "draw"
      : (match.homeScore > match.awayScore && isHome) ||
        (match.homeScore < match.awayScore && !isHome)
      ? "win"
      : "loss";

  return {
    result: result,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
  };
}

function buildSelectedTeamResult(
  teams: ITeam[],
  matches: IMatch[],
  filteredResults: number[],
  selectedTeamId?: number
): ITeamResults[] {
  if (!selectedTeamId) {
    return [];
  }
  const teamResults = filterTeamResults(
    selectedTeamId,
    matches,
    filteredResults
  );

  const results: ITeamResults[] = filteredResults
    .filter((teamId) => teamId !== selectedTeamId)
    .map((teamId) => {
      const homeMatch = teamResults.find((result) => result.awayId === teamId);
      const awayMatch = teamResults.find((result) => result.homeId === teamId);

      const result: ITeamResults = {
        opponentName:
          teams.find((team) => team.teamId === teamId)?.teamName ?? "",
        homeResult: buildMatchResult(true, homeMatch),
        awayResult: buildMatchResult(false, awayMatch),
      };
      return result;
    });

  return results;
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
  const binary = parseInt(teamsHash, 16).toString(2).split("").reverse();
  for (let i = 0; i < 20; i++) {
    if (Number(binary[i])) {
      result.push(i);
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
  pathName: string,
  presetQueryMap: ResultMap
): {
  preset: PresetQueries;
  visibleTeams: number[];
  visibleResults: number[];
} {
  let preset = PresetQueries.Top6;
  let visibleTeams = presetQueryMap[preset]!.visible;
  let visibleResults = presetQueryMap[preset]!.results;

  if (pathName !== "/") {
    const parts = pathName.split("/");
    const firstPart: string = parts[1];
    if (firstPart === PresetQueries[PresetQueries.Custom]) {
      preset = PresetQueries.Custom;
      visibleTeams = parseHash(parts[2]);
      visibleResults = parseHash(parts[3]);
    } else if (firstPart in PresetQueries) {
      preset = PresetQueries[firstPart as any] as any;
      visibleTeams = presetQueryMap[preset]!.visible;
      visibleResults = presetQueryMap[preset]!.results;
    }
  }
  return { preset, visibleResults, visibleTeams };
}

// TODO split up app component
const App: React.FC = () => {
  const classes = useStyles();
  const history = createBrowserHistory();
  const { teams, matches, presetQueryMap } = useLeagueData();

  const { preset, visibleTeams, visibleResults } = parseUrlState(
    history.location.pathname,
    presetQueryMap
  );

  const [filteredVisibleTeams, setFilteredVisibleTeams] = React.useState<
    number[]
  >(visibleTeams);
  const [filteredResults, setFilteredResults] = React.useState<number[]>(
    visibleResults
  );
  const [presetValue, setPresetValue] = React.useState<PresetQueries>(preset);
  const [selectedTeamId, selectTeamId] = React.useState<number | undefined>();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetValue, filteredResults, filteredVisibleTeams]);

  React.useEffect(() => {
    if (presetValue !== PresetQueries.Custom) {
      const presetData = presetQueryMap[presetValue];

      setFilteredVisibleTeams(presetData!.visible);
      setFilteredResults(presetData!.results);
    }
  }, [presetValue, presetQueryMap]);

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: deepPurple, // TODO make better theme colors
      secondary: amber,
    },
  });

  // TODO add custom sorting support
  const tableResults: ITableResult[] = teams
    .map((team) => calculateResults(team, matches, filteredResults))
    .sort((first, second) => second.points - first.points)
    .filter((result) => filteredVisibleTeams.includes(result.teamId));

  const selectedTeam = teams.find((team) => team.teamId === selectedTeamId);
  const selectedTeamResults = buildSelectedTeamResult(
    teams,
    matches,
    filteredResults,
    selectedTeamId
  );

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
        <ResultsTable results={tableResults} selectTeam={selectTeamId} />
        <TeamResultsModal
          selectedTeamName={selectedTeam?.teamName}
          teamResults={selectedTeamResults}
          closeModal={() => selectTeamId(undefined)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
