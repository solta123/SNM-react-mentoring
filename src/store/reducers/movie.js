import * as actionTypes from '../actions';

const initialState = {
    selectedMovie: null,
    movies: [],
    filteredMovies: [],
    selectedGenre: 'ALL',
    sortBy: 'year'
};

const genreFilter = state => {
    return state.selectedGenre === 'ALL' ? [...state.movies] :
        state.movies.filter(movie => movie.genre.includes(state.selectedGenre))
}

const sortMovies = state => {
    return state.filteredMovies.sort((a, b) => {
        if (a[state.sortBy] > b[state.sortBy]) {
            return 1;
        }
        return -1;
    });
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actionTypes.ADD:
            newState.movies.push(action.movie);
            newState.filteredMovies = genreFilter(newState);
            newState.filteredMovies = sortMovies(newState);
            break;
        case actionTypes.EDIT:
            newState.movies[newState.movies.findIndex(movie => movie.id === action.movie.id)] = action.movie;
            newState.filteredMovies = genreFilter(newState);
            newState.filteredMovies = sortMovies(newState);
            break;
        case actionTypes.DELETE:
            newState.movies.splice(newState.movies.findIndex(movie => movie.id === action.id), 1);
            newState.filteredMovies.splice(newState.filteredMovies.findIndex(movie => movie.id === action.id), 1);
            break;
        case actionTypes.SELECT_MOVIE:
            newState.selectedMovie = action.movie;
            break;
        case actionTypes.DESELECT_MOVIE:
            newState.selectedMovie = null;
            break;
        case actionTypes.GENRE_FILTER:
            newState.selectedGenre = action.genre;
            newState.filteredMovies = genreFilter(newState);
            newState.filteredMovies = sortMovies(newState);
            break;
        case actionTypes.SORT:
            newState.sortBy = action.sortBy;
            newState.filteredMovies = genreFilter(newState);
            newState.filteredMovies = sortMovies(newState);
            break;
        case actionTypes.GET:
            newState.movies = action.data;
            newState.filteredMovies = [...action.data];
            console.log(newState.movies)
            break;
        default: break;
    }

    return newState;
}

export default reducer;
