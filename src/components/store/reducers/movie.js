import * as actionTypes from '../actions';
import { mapMovie } from '../../mapper/movieMapper';

export const initialState = {
    selectedMovie: null,
    movies: [],
    filteredMovies: [],
    selectedGenre: window.location.search.includes('selectedGenre') ?
        new URLSearchParams(window.location.search).get('selectedGenre') : 'all',
    sortBy: 'release_date',
    sortOrder: 'desc',
    search: window.location.search.includes('title') ? new URLSearchParams(window.location.search).get('title') : '',
    isAddModalOpen: false,
    editableMovie: null,
    lang: 'en'
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
            newState.sortOrder = action.sortOrder;
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
            newState.search = window.location.search ? new URLSearchParams(window.location.search).get('title') : '';
            newState.selectedGenre = window.location.search.includes('selectedGenre') ?
                new URLSearchParams(window.location.search).get('selectedGenre') : 'all';
            break;
        case actionTypes.MODAL:
            newState.editableMovie = action.value ? action.movie : null;
            newState.isAddModalOpen = action.value;
            break;
        case actionTypes.LANG:
            newState.lang = action.lang;
            break;
        default: break;
    }
    return newState;
}

export default reducer;
