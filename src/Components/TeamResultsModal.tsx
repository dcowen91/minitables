import React from "react";
import {
  TableRow,
  Table,
  TableHead,
  TableCell,
  makeStyles,
  TableBody,
  Dialog,
  Card,
  Typography,
} from "@material-ui/core";

export interface IMatchResult {
  result: "win" | "draw" | "loss";
  homeScore: number;
  awayScore: number;
}

export interface ITeamResults {
  opponentName: string;
  homeResult?: IMatchResult;
  awayResult?: IMatchResult;
}

export interface ITeamResultsModal {
  selectedTeamName?: string;
  teamResults: ITeamResults[];
  closeModal: () => void;
}

const useStyles = makeStyles({
  win: {
    backgroundColor: "#7cb23e",
    borderLeft: "1px solid rgba(81, 81, 81, 1)",
  },
  loss: {
    backgroundColor: "#b23939",
    borderLeft: "1px solid rgba(81, 81, 81, 1)",
  },
  draw: {
    backgroundColor: "#676767",
    borderLeft: "1px solid rgba(81, 81, 81, 1)",
  },
  empty: {
    backgroundColor: "#343434",
    borderLeft: "1px solid rgba(81, 81, 81, 1)",
  },
  header: {
    marginBottom: 20,
  },
  card: {
    padding: 15,
  },
});

export const TeamResultsModal = (props: ITeamResultsModal) => {
  const classes = useStyles();

  const getCellClass = (result?: IMatchResult) => {
    if (!result) {
      return classes.empty;
    } else if (result.result === "win") {
      return classes.win;
    } else if (result.result === "loss") {
      return classes.loss;
    }
    return classes.draw;
  };

  return (
    <Dialog
      open={!!props.selectedTeamName}
      onClose={props.closeModal}
      maxWidth={"xs"}
      fullWidth
    >
      <Card variant={"elevation"} className={classes.card}>
        <Typography variant="h4" className={classes.header}>
          {props.selectedTeamName}'s results
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Opponent</TableCell>
              <TableCell>Home</TableCell>
              <TableCell>Away</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.teamResults.map((result) => {
              return (
                <TableRow key={result.opponentName}>
                  <TableCell>{result.opponentName}</TableCell>
                  {/** TODO fix this, home and away are backwards */}
                  <TableCell className={getCellClass(result.homeResult)}>
                    {result.homeResult
                      ? `${result.homeResult.homeScore}:${result.homeResult.awayScore}`
                      : "N/A"}
                  </TableCell>
                  <TableCell className={getCellClass(result.awayResult)}>
                    {result.awayResult
                      ? `${result.awayResult.homeScore}:${result.awayResult.awayScore}`
                      : "N/A"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Dialog>
  );
};
