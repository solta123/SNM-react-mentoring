import './MovieCard.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem, Modal, DialogContent } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import { connect } from 'react-redux';
import { deleteMovie, selectMovie } from '../store/actionCreator';
import noImage from '../../resources/no-image.png';
import { NavLink } from 'react-router-dom';
import * as actionTypes from '../store/actions';
import { useTranslation } from "react-i18next";

const MovieCard = (props) => {
  const [menu, setMenu] = React.useState(null);
  const [deletion, setDeletion] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation('common');

  const movieDetail = props.movie;

  const handleOpenEditModal = () => {
    props.handleModal(true, movieDetail);
    setMenu(null);
  }

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

  const onMovieClicked = id => {
    props.onSelectMovie(id);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const onImageLoadError = e => {
    e.target.src = noImage;
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
          <MenuItem onClick={handleOpenEditModal}>{t('edit')}</MenuItem>
          <MenuItem onClick={handleOpenDeletionModal}>{t('delete')}</MenuItem>
        </Menu>
      </div>
      <NavLink to={'/film/' + movieDetail.id}>
      <Card className="MovieCardRoot" onClick={() => onMovieClicked(movieDetail.id)}>
          <div>
            <img className="media" src={movieDetail.poster_path ? movieDetail.poster_path : noImage} alt={movieDetail.title}
              onError={e => onImageLoadError(e)} />
          </div>
          <CardContent className="details" >
            <div>
              <Typography gutterBottom variant="h5" component="h4" className="MovieCardDetailsTitle">
                {movieDetail.title}
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" component="p" className="MovieCardDetailsGenres">
              {movieDetail.genres.map((genre, i) => {
                if (i >= movieDetail.genres.length - 1) {
                  return <span key={genre}>{t(genre)}</span>
                }
                return <span key={genre}>{t(genre)}, </span>
              })}
            </Typography>
            <Paper variant="outlined" className="year" color="textSecondary">{movieDetail.release_date.substring(0, 4)}</Paper>
          </CardContent>
        </Card>
      </NavLink>
      <Modal open={deletion} onClose={closeDeletionModal} className="DeleteConfirmModal">
        <DialogContent>
          <DeleteConfirmModal type={'movie'} itemName={movieDetail.title}
            onClose={closeDeletionModal} onConfirm={confirmDeletion} />
        </DialogContent>
      </Modal>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    runtime: PropTypes.number,
    genres: PropTypes.array
  }),
  handleModal: PropTypes.func,
  onDelete: PropTypes.func,
  onSelectMovie: PropTypes.func
}

const mapStateToProps = state => {
  return {
    isAddModalOpen: state.movie.isAddModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectMovie: (id) => dispatch(selectMovie(id)),
    onDelete: (id) => dispatch(deleteMovie(id)),
    handleModal: (value, movie = null) => dispatch({ type: actionTypes.MODAL, value: value, movie: movie })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
