import axios from 'axios';
import * as actionTypes from './actions';
import { store } from '../index';

export const getMovies = (param = null) => {
    const state = param ? param : store.getState().movie;
    return async (dispatch) => {
        console.log(state)
        const result = await query(state) 
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
    console.log('add: ', movie)
    return dispatch => {
        axios.post('http://localhost:4000/movies',movie).then((res) => {
            console.log(res)
            dispatch(getMovies());
        }, err => {
            console.log(err)
        });
    }
}

export const editMovie = movie => {
    console.log('edit: ', movie)
    return dispatch => {
        axios.put('http://localhost:4000/movies', movie).then((res) => {
            console.log(res)
            dispatch(getMovies());
        });
    }
}

export const deleteMovie = id => {
    return dispatch => {
        axios.delete('http://localhost:4000/movies/' + id).then(() => {
            dispatch(getMovies());
        });
    }
}

export const filterGenre = genre => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, selectedGenre: genre });
            console.log('query done')
            dispatch({ type: actionTypes.GENRE_FILTER, value: genre, movies: movies.data.data });
        });
    }
}

export const sortMovies = sortBy => {
    return dispatch => {
        dispatch(async () => {
            const movies = await query({ ...store.getState().movie, sortBy: sortBy });
            dispatch({ type: actionTypes.SORT, value: sortBy, movies: movies.data.data });
        })
    }
}

const query = async state => {
    console.log('in query: ', state.selectedGenre)
    return await axios.get('http://localhost:4000/movies', {
        params: {
            sortBy: state.sortBy, sortOrder: 'desc',
            filter: state.selectedGenre && state.selectedGenre !== 'all' ? state.selectedGenre : null
        }
    });
}
