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
  pointsPerGame: number;
}

interface IResultsTableProps {
  results: ITableResult[];
  selectTeam: (teamId: number) => void;
}

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
    margin: "10px auto",
  },
  tableRow: {
    cursor: "pointer",
  },
});

export const ResultsTable = (props: IResultsTableProps) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Pos</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Pl</TableCell>
            <TableCell>W</TableCell>
            <TableCell>D</TableCell>
            <TableCell>L</TableCell>
            <TableCell>GD</TableCell>
            <TableCell>PTs</TableCell>
            <TableCell>PPG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map((result, index) => {
            return (
              <TableRow
                key={result.teamId}
                onClick={() => props.selectTeam(result.teamId)}
                className={classes.tableRow}
                hover
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result.teamName}</TableCell>
                <TableCell>
                  {result.wins + result.draws + result.losses}
                </TableCell>
                <TableCell>{result.wins}</TableCell>
                <TableCell>{result.draws}</TableCell>
                <TableCell>{result.losses}</TableCell>
                <TableCell>{result.GD}</TableCell>
                <TableCell>{result.points}</TableCell>
                <TableCell>{result.pointsPerGame}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
