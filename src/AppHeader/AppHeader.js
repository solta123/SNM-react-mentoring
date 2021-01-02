import './AppHeader.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const AppHeader = () => {
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
              <Typography variant="h6" className="title">
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
