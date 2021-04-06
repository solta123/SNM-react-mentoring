import axios from 'axios';
import * as actionTypes from './actions';
import { store } from './withStoreHoc';
import { mapMovie } from '../mapper/movieMapper';

export const getMovies = (param = null) => {
    const state = param ? param : store.getState().movie;
    return async (dispatch) => {
        const result = await query(state);
        dispatch(dispatchGetMovies(result.data.data));
    };
};

export const dispatchGetMovies = movies => {
    return {
        type: actionTypes.GET,
        movies: movies
    };
};

export const addMovie = movie => {
    const mappedMovie = mapMovie(movie);

    return dispatch => {
        axios.post('http://localhost:4000/movies', mappedMovie).then(() => {
            dispatch({ type: actionTypes.MODAL, value: false });
            dispatch(getMovies());
        }, error => {
            console.log(error);
        });
    };
};

export const editMovie = movie => {
    const mappedMovie = mapMovie(movie);

    return dispatch => {
        axios.put('http://localhost:4000/movies', mappedMovie).then(() => {
            dispatch({ type: actionTypes.MODAL, value: false });
            dispatch(getMovies());
        }, error => {
            console.log(error);
        });
    };
};

export const deleteMovie = id => {
    return dispatch => {
        axios.delete('http://localhost:4000/movies/' + id).then(() => {
            dispatch(getMovies());
        });
    };
};

export const filterGenre = (genre, sorting = 'asc') => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, selectedGenre: genre, sorting: sorting });
            dispatch({ type: actionTypes.GENRE_FILTER, selectedGenre: genre, movies: movies.data.data });
        });
    };
};

export const sortMovies = (sortBy, sortOrder) => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, sortBy: sortBy, sortOrder: sortOrder });
            dispatch({ type: actionTypes.SORT, sortBy: sortBy, sortOrder: sortOrder, movies: movies.data.data });
        })
    };
};

export const selectMovie = (id, history) => {
    return dispatch => {
        axios.get('http://localhost:4000/movies/' + id).then(result => {
            dispatch({ type: actionTypes.SELECT_MOVIE, movie: result.data })
        }, () => {
            history.push('/not-found');
        });
    };
};

export const search = text => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, search: text });
            dispatch({ type: actionTypes.SEARCH, search: text, movies: movies.data.data });
        });
    };
}

const query = async state => {
    console.log(state.sortBy + ' ' + state.sortOrder)
    return await axios.get('http://localhost:4000/movies', {
        params: {
            sortBy: state.sortBy, sortOrder: state.sortOrder || 'asc', searchBy: 'title', search: state.search,
            filter: state.selectedGenre && state.selectedGenre !== 'all' ? state.selectedGenre : null
        }
    });
};