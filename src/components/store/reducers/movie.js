import * as actionTypes from '../actions';
import { mapMovie } from '../../mapper/movieMapper';

export const initialState = {
    selectedMovie: null,
    movies: [],
    selectedGenre: window.location.search.includes('selectedGenre') ?
        new URLSearchParams(window.location.search).get('selectedGenre') : 'all',
    sortBy: 'release_date',
    sortOrder: 'desc',
    search: window.location.search.includes('title') ? new URLSearchParams(window.location.search).get('title') : '',
    isAddModalOpen: false,
    editableMovie: null,
    lang: sessionStorage.getItem('lang') || 'en',
    limit: 10,
    totalAmount: 0,
    offset: 0,
    page: 0
};

const reducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case actionTypes.SELECT_MOVIE:
            newState.selectedMovie = mapMovie(action.movie);
            break;
        case actionTypes.DESELECT_MOVIE:
            newState.selectedMovie = null;
            break;
        case actionTypes.GENRE_FILTER:
            newState.selectedGenre = action.selectedGenre;
            newState.page = 0;
            newState.offset = 0;
            break;
        case actionTypes.SORT:
            newState.sortBy = action.sortBy;
            newState.sortOrder = action.sortOrder;
            newState.page = 0;
            newState.offset = 0;
            break;
        case actionTypes.SEARCH:
            newState.search = action.search;
            newState.page = 0;
            newState.offset = 0;
            break;
        case actionTypes.GET:
            newState.movies = action.movies;
            newState.search = window.location.search ? new URLSearchParams(window.location.search).get('title') : '';
            newState.selectedGenre = window.location.search.includes('selectedGenre') ?
                new URLSearchParams(window.location.search).get('selectedGenre') : 'all';
            newState.totalAmount = action.totalAmount;
            break;
        case actionTypes.MODAL:
            newState.editableMovie = action.value ? action.movie : null;
            newState.isAddModalOpen = action.value;
            break;
        case actionTypes.LANG:
            newState.lang = action.lang;
            sessionStorage.setItem('lang', action.lang);
            break;
        case actionTypes.LIMIT:
            newState.limit = action.limit;
            newState.page = 0;
            newState.offset = 0;
            break;
        case actionTypes.PAGE:
            newState.page = action.page;
            newState.offset = action.page * newState.limit;
            break;
        case actionTypes.DEFAULT:
            newState = { ...initialState, search: '' };
            break;
        default: break;
    }
    return newState;
}

export default reducer;
