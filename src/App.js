import './App.css';
import AppHeader from './AppHeader/AppHeader';
import Searchbar from './Searchbar/Searchbar';
import FilterMovies from './FilterMovies/FilterMovies';
import MovieCard from './MovieCard/MovieCard';
import ErrorBoundary from './MovieCard/ErrorBoundary';
import MovieDetail from './MovieDetail/MovieDetail';

function App() {
  // ide kell egy useeffect a movie kiválasztására, annak state-jének beállítására, és nullra állításának is (closing)
  return (
    <ErrorBoundary>
      <div className="App">
        <div className="AppContainer">
          <AppHeader></AppHeader>
          <div className="container">
            <div className="MovieDetailDiv">
              <MovieDetail />
            </div>
            <div>
              <FilterMovies></FilterMovies>
            </div>
            <div className="MoviesList">
              <MovieCard title="Pulp fiction" year={new Date(1984, 11, 24).toISOString()} genre={['Crime']}
                img="https://images-na.ssl-images-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg" />
              <MovieCard title="Shrek" year={new Date(2001, 3, 26).toISOString()} genre={['Comedy']}
                img="https://mypostercollection.com/wp-content/uploads/2019/12/shrek-poster.jpg" />
              <MovieCard title="Insterstellar" year={new Date(2014, 10, 26).toISOString()} genre={['Sci-fi', 'Action']}
                img="https://cdn.shopify.com/s/files/1/1416/8662/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010" />
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
