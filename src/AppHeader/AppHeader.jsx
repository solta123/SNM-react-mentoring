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
import { NavLink } from 'react-router-dom';
import { initialState } from '../store/reducers/movie';
import { getMovies } from '../store/actionCreator';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

const AppHeader = props => {
  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/" className="title" onClick={props.getMovies}>
            <Typography variant="h6">
              <b>netflix</b>Roulette
            </Typography>
          </NavLink>
          <Button color="inherit" variant="outlined" onClick={() => props.handleModal(true)}>
            <AddIcon></AddIcon>Add movie
          </Button>
          <Modal open={props.isAddModalOpen} className="AddMovieModal" onClose={() => props.handleModal(false)}>
            <DialogContent>
              <AddMovieModal onCloseModal={() => props.handleModal(false)} />
            </DialogContent>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAddModalOpen: state.movie.isAddModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(getMovies({ ...initialState, search: '' })),
    handleModal: value => dispatch({ type: actionTypes.MODAL, value: value }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
