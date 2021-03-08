import * as actionTypes from '../actions';

export const initialState = {
    selectedMovie: null,
    movies: [],
    filteredMovies: [],
    selectedGenre: 'all',
    sortBy: 'release_date',
    search: window.location.search ? new URLSearchParams(window.location.search).get('title') : '',
    isAddModalOpen: false
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actionTypes.SELECT_MOVIE:
            newState.selectedMovie = action.movie;
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
            newState.search = window.location.search ? new URLSearchParams(window.location.search).get('title') : '';
            break;
        case actionTypes.MODAL:
            console.log(action.value)
            newState.isAddModalOpen = action.value;
            break;
        default: break;
    }
    console.log(newState)
    return newState;
}

export default reducer;
