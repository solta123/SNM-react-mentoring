import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Searchbar from '../Searchbar/Searchbar';
import MovieDetail from '../MovieDetail/MovieDetail';
import { connect } from 'react-redux';
import { getMovies } from '../store/actionCreator';
import MoviesList from '../MoviesList/MoviesList';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

const Home = props => {
    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (created) { return; }
        props.onGetMovies();
        setCreated(true);
    }, [created])

    return (
        <div className="App">
            <div className="AppContainer">
                <AppHeader />

                <Switch>
                    <Route path="/film/:id" component={MovieDetail} />
                    <Route component={Searchbar} />
                </Switch>
                <Route component={MoviesList} />
            </div>
            <footer className="AppFooter">
                <div><b>netflix</b>Roulette</div>
            </footer>
        </div>
    )
}

Home.propTypes = {
    onGetMovies: PropTypes.func
}


const mapStateToProps = state => {
    return {
        detailedMovie: state.movie.selectedMovie
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetMovies: () => dispatch(getMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
