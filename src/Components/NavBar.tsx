import React from "react";
import {
  makeStyles,
  AppBar,
  Typography,
  Toolbar,
  Theme,
  createStyles,
  Link
} from "@material-ui/core";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appIcon: {
      marginRight: theme.spacing(2)
    },
    appTitle: {
      flexGrow: 1
    },
    source: { color: "white", height: "24px" }
  })
);

export const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <SportsSoccerIcon className={classes.appIcon} />
        <Typography variant="h6" className={classes.appTitle}>
          minitables
        </Typography>
        <Link
          href="https://github.com/dcowen91/minitables"
          target="_blank"
          rel="noopener"
          className={classes.source}
        >
          <GitHubIcon />
        </Link>
      </Toolbar>
    </AppBar>
  );
};
