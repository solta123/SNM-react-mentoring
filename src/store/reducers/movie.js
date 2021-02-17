import * as actionTypes from '../actions';

const initialState = {
    selectedMovie: null,
    movies: [
        {
            img: 'https://images-na.ssl-images-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg',
            id: '123153',
            title: 'Pulp fiction',
            year: new Date(1984, 11, 24),
            genre: ['CRIME'],
            duration: 154,
            description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
        },
        {
            img: 'https://mypostercollection.com/wp-content/uploads/2019/12/shrek-poster.jpg',
            id: '123154',
            title: 'Shrek',
            year: new Date(2001, 3, 26),
            genre: ['COMEDY'],
            duration: 104,
            description: 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.'
        },
        {
            img: 'https://cdn.shopify.com/s/files/1/1416/8662/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010',
            id: '123157',
            title: 'Interstellar',
            year: new Date(2014, 10, 23),
            genre: ['SCI-FI', 'ACTION'],
            duration: 164,
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
        }
    ],
    filteredMovies: [
        {
            img: 'https://images-na.ssl-images-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg',
            id: '123153',
            title: 'Pulp fiction',
            year: new Date(1984, 11, 24),
            genre: ['CRIME'],
            duration: 154,
            description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
        },
        {
            img: 'https://mypostercollection.com/wp-content/uploads/2019/12/shrek-poster.jpg',
            id: '123154',
            title: 'Shrek',
            year: new Date(2001, 3, 26),
            genre: ['COMEDY'],
            duration: 104,
            description: 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.'
        },
        {
            img: 'https://cdn.shopify.com/s/files/1/1416/8662/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010',
            id: '123157',
            title: 'Interstellar',
            year: new Date(2014, 10, 23),
            genre: ['SCI-FI', 'ACTION'],
            duration: 164,
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
        }
    ]
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actionTypes.ADD:
            newState.movies.push(action.movie)
            break;
        case actionTypes.EDIT:
            newState.movies[newState.movies.findIndex(movie => movie.id === action.movie.id)] = action.movie;
            break;
        case actionTypes.DELETE:
            newState.movies.splice(newState.movies.findIndex(movie => movie.id === action.id), 1);
            break;
        case actionTypes.SELECT_MOVIE:
            newState.selectedMovie = action.movie;
            break;
        case actionTypes.DESELECT_MOVIE:
            newState.selectedMovie = null;
            break;
        case actionTypes.GENRE_FILTER:
            newState.filteredMovies = action.genre === 'all' ? [...newState.movies] :
                newState.movies.filter(movie => movie.genre.includes(action.genre));
            break;
        case actionTypes.SORT:
            console.log(action.sortBy)
            console.log(newState.filteredMovies.map(mov => mov.title))
            newState.filteredMovies = newState.filteredMovies.sort((a,b) => {
                if (a[action.sortBy] > b[action.sortBy]) {
                    return 1;
                }
                return -1;
            });
            console.log(newState.filteredMovies.map(mov => mov.title))
            break;
        default: break;
    }

    return newState;
}

export default reducer;
