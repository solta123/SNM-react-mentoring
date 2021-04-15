import React from 'react';
import FilterMovies from '../FilterMovies/FilterMovies';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import './MoviesList.css';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import TablePagination from '@material-ui/core/TablePagination';
import { changelimit, changePage } from '../store/actionCreator';

const MoviesList = props => {
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');

    const handlePageChange = (event, newPage) => {
        console.log(newPage)
        props.handlePageChange(newPage);
    }

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
            <TablePagination
                component="div"
                count={props.totalAmount}
                page={props.page}
                onChangePage={handlePageChange}
                rowsPerPage={props.limit}
                onChangeRowsPerPage={event => props.handleLimitChange(event.target.value)}
                labelRowsPerPage="Movies per page:"
            />
        </div>
    );
};

MoviesList.propTypes = {
    movies: PropTypes.array,
    totalAmount: PropTypes.number,
    offset: PropTypes.number,
    limit: PropTypes.number,
    page: PropTypes.number,
    handleLimitChange: PropTypes.func,
    handlePageChange: PropTypes.func
}

const mapStateToProps = state => {
    return {
        movies: [...state.movie.movies],
        totalAmount: state.movie.totalAmount,
        limit: state.movie.limit,
        offset: state.movie.offset,
        page: state.movie.page
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLimitChange: limit => dispatch(changelimit(limit)),
        handlePageChange: page => dispatch(changePage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
