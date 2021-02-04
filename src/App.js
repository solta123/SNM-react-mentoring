import './App.css';
import AppHeader from './AppHeader/AppHeader';
import Searchbar from './Searchbar/Searchbar';
import FilterMovies from './FilterMovies/FilterMovies';
import MovieCard from './MovieCard/MovieCard';
import ErrorBoundary from './MovieCard/ErrorBoundary';
import MovieDetail from './MovieDetail/MovieDetail';
import { useState } from 'react';

function App() {
  // ide kell egy useeffect a movie kiválasztására, annak state-jének beállítására, és nullra állításának is (closing)
  const [detailedMovie, setDetailedMovie] = useState(null);

  const movies = [
    {
      img: 'https://images-na.ssl-images-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg',
      id: '123153',
      title: 'Pulp fiction',
      year: new Date(1984, 11, 24),
      genre: ['Crime'],
      duration: 154,
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    },
    {
      img: 'https://mypostercollection.com/wp-content/uploads/2019/12/shrek-poster.jpg',
      id: '123154',
      title: 'Shrek',
      year: new Date(2001, 3, 26),
      genre: ['Comedy'],
      duration: 104,
      description: 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.'
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/1416/8662/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010',
      id: '123157',
      title: 'Interstellar',
      year: new Date(2014, 10, 23),
      genre: ['Sci-fi', 'Action'],
      duration: 164,
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    }
  ]

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="AppContainer">
          <AppHeader></AppHeader>
          <div className="container">
            {(detailedMovie) ?
              <MovieDetail movie={detailedMovie} handleClose={() => setDetailedMovie(null)} /> : <Searchbar />}
            
            <div>
              <FilterMovies></FilterMovies>
            </div>
            <div className="MoviesList">
              {movies.map(movie => {
                return <MovieCard key={movie.id} movie={movie} handleClick={() => setDetailedMovie(movie)} />
              })}
            </div>
          </div>

        </div>
        <footer className="AppFooter">
          <div><b>netflix</b>Roulette</div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
