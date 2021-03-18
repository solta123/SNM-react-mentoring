import * as actionTypes from '../actions';
import { mapMovie } from '../../mapper/movieMapper';

export const getLocation = () => window && window.location ? window.location : '';

export const initialState = {
    selectedMovie: null,
    movies: [],
    filteredMovies: [],
    selectedGenre: 'all',
    sortBy: 'release_date',
    search: getLocation().search ? new URLSearchParams(getLocation().search).get('title') : '',
    isAddModalOpen: false,
    editableMovie: null
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actionTypes.SELECT_MOVIE:
            newState.selectedMovie = mapMovie(action.movie);
            break;
        case actionTypes.DESELECT_MOVIE:
            newState.selectedMovie = null;
            break;
        case actionTypes.GENRE_FILTER:
            newState.selectedGenre = action.selectedGenre;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.SORT:
            newState.sortBy = action.sortBy;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.SEARCH:
            newState.search = action.search;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.GET:
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            newState.search = getLocation().search ? new URLSearchParams(getLocation().search).get('title') : '';
            break;
        case actionTypes.MODAL:
            newState.editableMovie = action.value ? action.movie : null;
            newState.isAddModalOpen = action.value;
            break;
        default: break;
    }
    return newState;
}

export default reducer;
