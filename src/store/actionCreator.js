import axios from 'axios';
import * as actionTypes from './actions';

export const getMovies = () => {
    return (dispatch) => {
        axios.get('http://localhost:4000/movies', { params: { /*sortBy: 'title', sortOrder: 'asc'*/} }).then(result => {
            dispatch(dispatchGetMovies(result.data.data));
        });
    };
};

export const dispatchGetMovies = movies => {
    return {
        type: actionTypes.GET,
        data: movies
    };
};
