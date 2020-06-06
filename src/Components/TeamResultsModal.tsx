import React from "react";
import {
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  makeStyles,
  TableBody,
  Dialog,
  Card,
  Typography,
} from "@material-ui/core";
import { IMatch } from "../App.types";

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
  },
  loss: {
    backgroundColor: "#b23939",
  },
  draw: {
    backgroundColor: "#424242",
  },
  empty: {
    backgroundColor: "#333",
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
      <Card variant={"outlined"}>
        <Typography>{props.selectedTeamName}'s results</Typography>
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
                      ? `${result.homeResult.awayScore}:${result.homeResult.homeScore}`
                      : "N/A"}
                  </TableCell>
                  <TableCell className={getCellClass(result.awayResult)}>
                    {result.awayResult
                      ? `${result.awayResult.awayScore}:${result.awayResult.homeScore}`
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
