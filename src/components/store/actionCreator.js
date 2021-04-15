import axios from 'axios';
import * as actionTypes from './actions';
import { store } from './withStoreHoc';
import { mapMovie } from '../mapper/movieMapper';
import { initialState } from './reducers/movie';

export const setToDefaultState = () => {
    return async (dispatch) => {
        const result = await query({ ...initialState, search: '' });
        dispatch({ type: actionTypes.DEFAULT });
        dispatch({ type: actionTypes.GET, movies: result.data.data, totalAmount: result.data.totalAmount });
    }
};

export const getMovies = (param = null) => {
    const state = param ? param : store.getState().movie;
    return async (dispatch) => {
        const result = await query(state);
        dispatch({
            type: actionTypes.GET,
            totalAmount: result.data.totalAmount,
            limit: result.data.limit,
            offset: result.data.offset,
            movies: result.data.data
        });
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
            const movies = await query({ ...store.getState().movie, selectedGenre: genre, sorting, offset: 0 });
            dispatch({ type: actionTypes.GENRE_FILTER, selectedGenre: genre });
            dispatch({ type: actionTypes.GET, movies: movies.data.data, totalAmount: movies.data.totalAmount });
        });
    };
};

export const sortMovies = (sortBy, sortOrder) => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, sortBy, sortOrder, offset: 0 });
            dispatch({ type: actionTypes.SORT, sortBy, sortOrder });
            dispatch({ type: actionTypes.GET, movies: movies.data.data, totalAmount: movies.data.totalAmount });
        });
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
            const movies = await query({ ...store.getState().movie, search: text, offset: 0 });
            dispatch({ type: actionTypes.SEARCH, search: text });
            dispatch({ type: actionTypes.GET, movies: movies.data.data, totalAmount: movies.data.totalAmount });
        });
    };
}

export const changeLimit = limit => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, limit, offset: 0, page: 1 });
            dispatch({ type: actionTypes.LIMIT, limit });
            dispatch({ type: actionTypes.GET, movies: movies.data.data, totalAmount: movies.data.totalAmount })
        });
    }
}

export const changePage = page => {
    return dispatch => {
        dispatch(async () => {
            const storeData = store.getState().movie;
            const movies = await query({ ...storeData, offset: storeData.limit * page, page });
            dispatch({ type: actionTypes.PAGE, page });
            dispatch({ type: actionTypes.GET, movies: movies.data.data, totalAmount: movies.data.totalAmount })
        });
    };
};

const query = async state => {
    return await axios.get('http://localhost:4000/movies', {
        params: {
            sortBy: state.sortBy, sortOrder: state.sortOrder || 'asc', searchBy: 'title', search: state.search,
            filter: state.selectedGenre && state.selectedGenre !== 'all' ? state.selectedGenre : null,
            limit: state.limit, offset: state.offset
        }
    });
};
