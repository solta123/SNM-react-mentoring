import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppHeader from './AppHeader/AppHeader';
import Searchbar from './Searchbar/Searchbar';
import FilterMovies from './FilterMovies/FilterMovies';
import MovieCard from './MovieCard/MovieCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '16px'
    // rem-et inkabb, akár vv, %, ...
  },
  footer: {
    top: 'auto',
    position: 'absolute',
    bottom: 0
  },
  footerContent: {
    alignSelf: 'center',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <AppHeader></AppHeader>
      <div className={classes.container}>
        <Searchbar />
        <div>
          <FilterMovies></FilterMovies>
        </div>
        <div className="MoviesList">
          <MovieCard title="Pulp fiction" year="1984" genre="Action & adventure"
            img="https://images-na.ssl-images-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg"></MovieCard>
          <MovieCard title="Shrek" year="2001" genre="Amination, Comedy"
            img="https://mypostercollection.com/wp-content/uploads/2019/12/shrek-poster.jpg"></MovieCard>
          <MovieCard title="Insterstellar" year="2014" genre="Sci-fi"
            img="https://cdn.shopify.com/s/files/1/1416/8662/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010"></MovieCard>
        </div>
      </div>
      <footer className="AppFooter">
        <div><b>netflix</b>Roulette</div>
      </footer>
    </div>
  );
}

export default App;
