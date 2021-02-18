import './App.css';
import AppHeader from './AppHeader/AppHeader';
import Searchbar from './Searchbar/Searchbar';
import FilterMovies from './FilterMovies/FilterMovies';
import MovieCard from './MovieCard/MovieCard';
import ErrorBoundary from './common/ErrorBoundrary/ErrorBoundary';
import MovieDetail from './MovieDetail/MovieDetail';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getMovies } from './store/actionCreator';

const App = props => {
  useEffect(() => {
    props.onGetMovies();
    //return () => {
    //  ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  }, [props.sortBy, props.selectedGenre]);

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
    movies: [...state.movie.filteredMovies],
    selectedGenre: state.movie.selectedGenre,
    sortBy: state.movie.sortBy
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetMovies: () => dispatch(getMovies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
