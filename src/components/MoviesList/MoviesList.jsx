import React from 'react';
import FilterMovies from '../FilterMovies/FilterMovies';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import './MoviesList.css';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const MoviesList = props => {
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');

    return (
        <div>
            <FilterMovies />
            <div className="MoviesList">
                {props.movies?.length ?
                    props.movies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie} />
                    }) : <i className="text-center max-width">{t('no_movies')}</i>
                }
            </div>
        </div>
    );
};

MoviesList.propTypes = {
    movies: PropTypes.array
}

const mapStateToProps = state => {
    return {
        movies: [...state.movie.filteredMovies]
    }
};

export default connect(mapStateToProps)(MoviesList);
