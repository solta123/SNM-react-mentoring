import './AppHeader.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddMovieModal from '../AddMovieModal/AddMovieModal';
import Modal from '@material-ui/core/Modal';
import { DialogContent, Select, MenuItem, FormControl } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { setToDefaultState } from '../store/actionCreator';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const AppHeader = props => {
    const { t, i18n } = useTranslation('common');
    const tSource = 'NETFLIXROULETTE.APP_HEADER.';

  const handleLangChange = event => {
    i18n.changeLanguage(event.target.value);
    props.handleLang(event.target.value);
  };

  return (
    <div className="root">
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/" className="title" onClick={props.getMovies}>
            <Typography variant="h6">
              <b>netflix</b>Roulette
            </Typography>
          </NavLink>
          <Button id="AddMovieButton" color="inherit" variant="outlined" onClick={() => props.handleModal(true)}>
            <AddIcon></AddIcon>{t(tSource + 'ADD_MOVIE')}
          </Button>
          <FormControl id="lang-button">
            <Select id="lang-select" value={props.lang} onChange={handleLangChange}>
              <MenuItem id="en" value="en">en</MenuItem>
              <MenuItem id="hu" value="hu">hu</MenuItem>
            </Select>
          </FormControl>
          <Modal open={props.isAddModalOpen} className="AddMovieModal">
            <DialogContent>
              <AddMovieModal onCloseModal={() => props.handleModal(false)} />
            </DialogContent>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppHeader.propTypes = {
  isAddModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getMovies: PropTypes.func,
  lang: PropTypes.string,
  handleLang: PropTypes.func
}

const mapStateToProps = state => {
  return {
    isAddModalOpen: state.movie.isAddModalOpen,
    lang: state.movie.lang
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(setToDefaultState()),
    handleModal: value => dispatch({ type: actionTypes.MODAL, value }),
    handleLang: lang => dispatch({ type: actionTypes.LANG, lang })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
