import * as actionTypes from '../actions';

const initialState = {
    selectedMovie: null,
    movies: [],
    filteredMovies: [],
    selectedGenre: 'all',
    sortBy: 'release_date',
    search: window.location.search ? new URLSearchParams(window.location.search).get('title') : ''
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actionTypes.SELECT_MOVIE:
            newState.selectedMovie = action.movie;
            newState.search = '';
            break;
        case actionTypes.DESELECT_MOVIE:
            newState.selectedMovie = null;
            newState.search = '';
            break;
        case actionTypes.GENRE_FILTER:
            newState.selectedGenre = action.value;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.SORT:
            newState.sortBy = action.value;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.SEARCH:
            newState.search = action.value;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.GET:
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        default: break;
    }

    return newState;
}

export default reducer;
