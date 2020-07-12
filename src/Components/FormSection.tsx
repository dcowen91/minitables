import React from "react";
import {
  makeStyles,
  Paper,
  Chip,
  Box,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  IconButton,
  Tooltip,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { ITeam, PresetQueries } from "../App.types";
import InfoIcon from "@material-ui/icons/Info";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles({
  chipSection: {
    width: 305,
    display: "flex",
    flexWrap: "wrap",
    margin: 15,
    padding: 5,
  },
  box: {
    display: "flex",
    flexWrap: "wrap",
  },
  select: {
    minWidth: "200px",
    marginTop: "20px",
  },
  chip: {
    width: "55px",
    margin: "2px",
  },
  chipHeader: {
    width: "100%",
  },
  infoIcon: {
    fontSize: "14px",
  },
  dropdownContainer: {
    margin: "15px",
  },
  share: {
    height: 32,
    width: 32,
  },
});

interface IFormSectionProps {
  presetValue: PresetQueries;
  setPresetValue: (val: PresetQueries) => void;
  teams: ITeam[];
  filteredVisibleTeams: number[];
  setFilteredVisibleTeams: (teams: number[]) => void;
  filteredResults: number[];
  setFilteredResults: (results: number[]) => void;
}

export const FormSection = (props: IFormSectionProps) => {
  const classes = useStyles();
  const [isCopied, setIsCopied] = React.useState(false);

  // TODO convert chips to multi-select combobox
  return (
    <>
      <Box className={classes.box}>
        <FormControl className={classes.dropdownContainer}>
          <Select
            value={props.presetValue}
            onChange={(evt) =>
              props.setPresetValue(evt.target.value as PresetQueries)
            }
            autoWidth
            className={classes.select}
          >
            <MenuItem value={PresetQueries.Top6}>Top 6</MenuItem>
            <MenuItem value={PresetQueries.Big6}>Big 6</MenuItem>
            <MenuItem value={PresetQueries.Bottom6}>Bottom 6</MenuItem>
            <MenuItem value={PresetQueries.TopHalf}>Top half</MenuItem>
            <MenuItem value={PresetQueries.BottomHalf}>Bottom half</MenuItem>
            <MenuItem value={PresetQueries.TopHalfVsBottom}>
              Top half vs bottom half
            </MenuItem>
            <MenuItem value={PresetQueries.BottomHalfVsTop}>
              Bottom half vs top half
            </MenuItem>
            <MenuItem value={PresetQueries.All}>All results</MenuItem>
            <MenuItem value={PresetQueries.Custom}>Custom</MenuItem>
          </Select>
          <FormHelperText>Presets</FormHelperText>
        </FormControl>
        <Paper className={classes.chipSection}>
          <FormHelperText className={classes.chipHeader}>
            Visible teams <InfoIcon className={classes.infoIcon} />
          </FormHelperText>
          {props.teams.map((team: ITeam) => (
            <Chip
              className={classes.chip}
              key={team.teamId}
              label={team.teamShortName}
              color={
                props.filteredVisibleTeams.includes(team.teamId)
                  ? "primary"
                  : undefined
              }
              onClick={() => {
                if (props.filteredVisibleTeams.includes(team.teamId)) {
                  const tempResults = props.filteredVisibleTeams.filter(
                    (item) => item !== team.teamId
                  );
                  props.setFilteredVisibleTeams(tempResults);
                } else {
                  props.setFilteredVisibleTeams([
                    ...props.filteredVisibleTeams,
                    team.teamId,
                  ]);
                }
                props.setPresetValue(PresetQueries.Custom);
              }}
            />
          ))}
        </Paper>
        <Paper className={classes.chipSection}>
          <FormHelperText className={classes.chipHeader}>
            Included opponents <InfoIcon className={classes.infoIcon} />
          </FormHelperText>
          {props.teams.map((team) => (
            <Chip
              className={classes.chip}
              key={team.teamId}
              label={team.teamShortName}
              color={
                props.filteredResults.includes(team.teamId)
                  ? "primary"
                  : undefined
              }
              onClick={() => {
                if (props.filteredResults.includes(team.teamId)) {
                  const tempResults = props.filteredResults.filter(
                    (item) => item !== team.teamId
                  );
                  props.setFilteredResults(tempResults);
                } else {
                  props.setFilteredResults([
                    ...props.filteredResults,
                    team.teamId,
                  ]);
                }
                props.setPresetValue(PresetQueries.Custom);
              }}
            />
          ))}
        </Paper>
        <div>
          <Tooltip title="Share">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(
                  () => setIsCopied(true),
                  () => alert("failed")
                );
              }}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <Snackbar
        open={isCopied}
        onClose={() => setIsCopied(false)}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity="info">
          Copied to clipboard
        </MuiAlert>
      </Snackbar>
    </>
  );
};
