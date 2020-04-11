import React from "react";
import {
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  makeStyles,
  Paper,
} from "@material-ui/core";

export interface ITableResult {
  teamId: number;
  teamName: string;
  wins: number;
  draws: number;
  losses: number;
  GD: number;
  points: number;
}

interface IResultsTableProps {
  results: ITableResult[];
}

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
    margin: "10px auto",
  },
});

export const ResultsTable = (props: IResultsTableProps) => {
  const classes = useStyles();

  return (
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
        {props.results.map((result) => {
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
  );
};
