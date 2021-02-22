import * as actionTypes from '../actions';

const initialState = {
    selectedMovie: null,
    movies: [],
    filteredMovies: [],
    selectedGenre: 'all',
    sortBy: 'release_date'
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
            newState.selectedGenre = action.value;
            newState.movies = action.movies;
            newState.filteredMovies = [...action.movies];
            break;
        case actionTypes.SORT:
            newState.sortBy = action.value;
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
