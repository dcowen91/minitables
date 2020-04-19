import React from "react";
import {
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  makeStyles,
  Paper,
  TableBody,
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
  nameColumn: {
    minWidth: "300px",
  },
});

export const ResultsTable = (props: IResultsTableProps) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.nameColumn}>Team</TableCell>
            <TableCell>W</TableCell>
            <TableCell>D</TableCell>
            <TableCell>L</TableCell>
            <TableCell>GD</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map((result) => {
            return (
              <TableRow key={result.teamId}>
                <TableCell className={classes.nameColumn}>
                  {result.teamName}
                </TableCell>
                <TableCell>{result.wins}</TableCell>
                <TableCell>{result.draws}</TableCell>
                <TableCell>{result.losses}</TableCell>
                <TableCell>{result.GD}</TableCell>
                <TableCell>{result.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
