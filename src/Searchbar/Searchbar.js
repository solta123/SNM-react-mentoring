import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    searchButton: {
        height: '56px'
    },
    form: {
        verticalAlign: 'middle'
    }
}));

const Searchbar = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
          <form className={classes.form}>
              <TextField variant="outlined" label="Search for movies"></TextField>
              <Button className={classes.searchButton} color="primary" variant="contained">Search</Button>
          </form>
      </div>
    );
}

export default Searchbar;
