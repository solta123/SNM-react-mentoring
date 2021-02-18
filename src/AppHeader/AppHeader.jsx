import './AppHeader.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddMovieModal from '../AddMovieModal/AddMovieModal';
import Modal from '@material-ui/core/Modal';
import { DialogContent } from '@material-ui/core';

const AppHeader = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            <b>netflix</b>Roulette
          </Typography>
          <Button color="inherit" variant="outlined" onClick={() => setOpen(true)}>
            <AddIcon></AddIcon>Add movie
          </Button>
          <Modal open={open} onClose={() => setOpen(false)} className="AddMovieModal">
            <DialogContent>
              <AddMovieModal onCloseModal={() => setOpen(false)} />
            </DialogContent>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;
