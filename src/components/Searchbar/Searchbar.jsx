import './Searchbar.css';
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { search } from '../store/actionCreator';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";

const Searchbar = props => {
    const history = useHistory();
    // eslint-disable-next-line react/prop-types
    const { t } = props;

    const handleSubmit = event => {
        event.preventDefault();
        const title = document.getElementById('search')?.value
        if (title) {
            history.push({
                pathname: '/search',
                search: "?" +
                    'title=' + title +
                    (window.location.search.includes('selectedGenre') ?
                        '&selectedGenre=' + new URLSearchParams(window.location.search).get('selectedGenre') : '')
            });
            props.onSearch(title);
        }
    }

    return (
        <div className="SearchbarDiv">
            <form className="form" onSubmit={handleSubmit}>
                <TextField variant="outlined" id="search" name="search" type="text" label={t('search')} defaultValue={props.search} />
                <Button className="searchButton" color="primary" variant="contained"
                    type="submit">{t('search')}</Button>
            </form>
        </div>
    );
}

Searchbar.propTypes = {
    onSearch: PropTypes.func,
    search: PropTypes.string
}

const mapStateToProps = state => {
    return {
        search: state.movie.search
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSearch: text => dispatch(search(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(Searchbar));
