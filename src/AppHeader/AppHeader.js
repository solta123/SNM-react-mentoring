import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
    },
    addIcon: {
        paddingRight: '8px'
    }
}));

const AppHeader = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
                  <b>netflix</b>Roulette
              </Typography>
              <Button color="inherit" variant="outlined">
                  <AddIcon></AddIcon>Add movie
              </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default AppHeader;
