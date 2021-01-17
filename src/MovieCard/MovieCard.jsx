import './MovieCard.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem, Modal, DialogContent } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddMovieModal from '../AddMovieModal/AddMovieModal';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

const MovieCard = (props) => {
  const [menu, setMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [deletion, setDeletion] = React.useState(false);

  const movieDetail = {
    img: props.img,
    id: '123154',
    title: props.title,
    year: new Date(props.year),
    genre: props.genre,
    duration: 96
  }

  const handleOpen = () => {
    setOpen(true);
    setMenu(null);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  const openDeletion = () => {
    setDeletion(true);
    setMenu(null);
  }

  const closeDeletion = () => {
    setDeletion(false);
  }

  const confirmDeletion = () => {
    setDeletion(false);
    console.log('deleted movie');
  }

  return (
    <div className="MovieCardDiv">
      <div>
        <IconButton className="MoreButton" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={menu} keepMounted open={Boolean(menu)} onClose={handleCloseMenu}>
          <MenuItem onClick={handleOpen}>Edit</MenuItem>
          <MenuItem onClick={openDeletion}>Delete</MenuItem>
        </Menu>
      </div>
      <Card className="MovieCardRoot">
        <CardActionArea>
          <CardMedia className="media" image={props.img} title={props.title} />
          <CardContent className="details">
            <div>
              <Typography gutterBottom variant="h5" component="h4">
                {props.title}
              </Typography>
              <Paper variant="outlined" className="year" color="textSecondary">{movieDetail.year.getFullYear()}</Paper>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.genre.map((genre, i) => {
                if (i >= props.genre.length - 1) {
                  return <span key={genre}>{genre}</span>
                }
                return <span key={genre}>{genre}, </span>
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={open} onClose={handleCloseModal} className="AddMovieModal">
        <DialogContent>
          <AddMovieModal movieDetail={movieDetail} onCloseModal={handleCloseModal} />
        </DialogContent>
      </Modal>
      <Modal open={deletion} onClose={closeDeletion} className="DeleteConfirmModal">
        <DialogContent>
          <DeleteConfirmModal type={'movie'} itemName={movieDetail.title} onClose={closeDeletion} onConfirm={confirmDeletion} />
        </DialogContent>
      </Modal>
    </div>
  );
}

MovieCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  genre: PropTypes.array,
  year: PropTypes.string
}

export default MovieCard;
