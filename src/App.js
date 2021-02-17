import './App.css';
import AppHeader from './AppHeader/AppHeader';
import Searchbar from './Searchbar/Searchbar';
import FilterMovies from './FilterMovies/FilterMovies';
import MovieCard from './MovieCard/MovieCard';
import ErrorBoundary from './common/ErrorBoundrary/ErrorBoundary';
import MovieDetail from './MovieDetail/MovieDetail';
import { connect } from 'react-redux';

const App = props => {
  return (
    <ErrorBoundary>
      <div className="App">
        <div className="AppContainer">
          <AppHeader></AppHeader>
          <div className="container">
            {(props.detailedMovie) ?
              <MovieDetail movie={props.detailedMovie} /> : <Searchbar />}
            <div>
              <FilterMovies></FilterMovies>
            </div>
            
            <div className="MoviesList">
              {props.movies.length ?
                props.movies.map(movie => {
                  return <MovieCard key={movie.id} movie={movie} />
                }) : <i className="text-center">No movies</i>
              }
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

const mapStateToProps = state => {
  return {
    detailedMovie: state.movie.selectedMovie,
    movies: [...state.movie.filteredMovies]
  }
};

export default connect(mapStateToProps)(App);
