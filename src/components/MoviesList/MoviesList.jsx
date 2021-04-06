import React from 'react';
import FilterMovies from '../FilterMovies/FilterMovies';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import './MoviesList.css';
import PropTypes from 'prop-types';

const MoviesList = props => {
    return (
        <div>
            <FilterMovies></FilterMovies>
            <div className="MoviesList">
                {props.movies?.length ?
                    props.movies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie} />
                    }) : <i className="text-center max-width">No movies</i>
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
