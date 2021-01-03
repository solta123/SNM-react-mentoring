import './AppHeader.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Modal, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const AppHeader = () => {
  const [open, setOpen] = React.useState(false);
  const [genre, setGenre] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const genres = ['Documentary', 'Comedy', 'Horror', 'Crime', 'Action', 'Adventure', 'Drama', 'Oscar winning movie', 'Musical'];

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            <b>netflix</b>Roulette
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleOpen}>
            <AddIcon></AddIcon>Add movie
          </Button>
          <Modal open={open} onClose={handleClose} className="AddMovieModal">
            <Paper className="ModalContainer">
              <div>
                <CloseIcon onClick={handleClose} className="closeIcon" />
                <Typography variant="h5">Add Movie</Typography>
              </div>
              <form className="AddMovieForm">
                <div>
                  <TextField label="Title" />
                </div>
                <div>
                  <TextField label="Release date" type="date" InputLabelProps={{ shrink: true }} />
                </div>
                <div>
                  <TextField label="Movie URL" />
                </div>
                <div>
                  <FormControl>
                    <InputLabel>Genre</InputLabel>
                    <Select value={genre} onChange={handleGenreChange} multiple>
                      {genres.map(genreItem => (
                        <MenuItem key={genreItem} value={genreItem}>{genreItem}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField label="Overview" multiline rows={3} rowsMax={10} />
                </div>
                <div>
                  <TextField label="Runtime" type="number" />
                </div>
                <div>
                  <Button variant="contained" color="primary" className="AddMovieFormButtons">Submit</Button>
                  <Button variant="contained" className="AddMovieFormButtons">Reset</Button>
                </div>
              </form>
            </Paper>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppHeader;
