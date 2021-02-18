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
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

const MovieCard = (props) => {
  const [menu, setMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [deletion, setDeletion] = React.useState(false);

  const movieDetail = props.movie;

  const handleOpenEditModal = () => {
    setOpen(true);
    setMenu(null);
  }

  const handleCloseEditModal = () => {
    setOpen(false);
  };

  const handleOpenDeletionModal = () => {
    setDeletion(true);
    setMenu(null);
  }

  const closeDeletionModal = () => {
    setDeletion(false);
  }

  const confirmDeletion = () => {
    setDeletion(false);
    props.onDelete(movieDetail.id);
  }

  const onMovieClicked = movie => {
    props.onSelectMovie(movie);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  return (
    <div className="MovieCardDiv">
      <div className="MoreButtonDiv">
        <IconButton className="MoreButton" disableRipple
          style={{ backgroundColor: '#2d2d2d', color: 'white', border: '2px white solid' }}
          onClick={(event) => { setMenu(event.currentTarget); }}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={menu} open={!!menu} onClose={() => setMenu(null)}>
          <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
          <MenuItem onClick={handleOpenDeletionModal}>Delete</MenuItem>
        </Menu>
      </div>
      <Card className="MovieCardRoot" onClick={() => onMovieClicked(movieDetail)}>
        <CardActionArea disableRipple>
          <CardMedia className="media" image={movieDetail.poster_path} title={movieDetail.title} />
          <CardContent className="details">
            <div>
              <Typography gutterBottom variant="h5" component="h4">
                {movieDetail.title}
              </Typography>
              <Paper variant="outlined" className="year" color="textSecondary">{movieDetail.release_date.substring(0, 4)}</Paper>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {movieDetail.genres.map((genre, i) => {
                if (i >= movieDetail.genres.length - 1) {
                  return <span key={genre}>{genre}</span>
                }
                return <span key={genre}>{genre}, </span>
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={open} onClose={handleCloseEditModal} className="AddMovieModal">
        <DialogContent>
          <AddMovieModal movieDetail={movieDetail} onCloseModal={handleCloseEditModal} />
        </DialogContent>
      </Modal>
      <Modal open={deletion} onClose={closeDeletionModal} className="DeleteConfirmModal">
        <DialogContent>
          <DeleteConfirmModal type={'movie'} itemName={movieDetail.title} onClose={closeDeletionModal} onConfirm={confirmDeletion} />
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

const mapDispatchToProps = dispatch => {
  return {
    onSelectMovie: (movie) => dispatch({ type: actionTypes.SELECT_MOVIE, movie: movie }),
    onDelete: (id) => dispatch({ type: actionTypes.DELETE, id: id })
  }
}

export default connect(null, mapDispatchToProps)(MovieCard);
