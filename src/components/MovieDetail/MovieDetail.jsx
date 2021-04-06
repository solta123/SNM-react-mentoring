import React, { useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './MovieDetail.scss';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectMovie } from '../store/actionCreator';

const MovieDetail = props => {
    const history = useHistory();

    useEffect(() => {
        if (!props.movie) {
            props.onGetDetailedMovie(props.match.params.id, history);
        }
    }, []);

    const handleDeselect = () => {
        history.push(props.search ? { pathname: '/search', search: '?title=' + props.search } : '/');
        props.onDeselectMovie();
    }

    return <Paper className="MovieDetail">
        {!props.movie ? <i>Loading...</i> : (
            <div>
                <Link to="/">
                    <SearchIcon onClick={handleDeselect} />
                </Link>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <img src={props.movie.poster_path} alt={props.movie.title} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h3">{props.movie.title}</Typography>
                        <Typography variant="subtitle1">
                            {props.movie.genres.map((genre, i) => {
                                if (i + 1 < props.movie.genres.length) {
                                    return genre + ', ';
                                }
                                return genre;
                            })}
                        </Typography>
                        <Typography variant="h5">{props.movie.release_date}, {props.movie.runtime} min</Typography>
                        <Typography variant="subtitle1">{props.movie.overview}</Typography>
                    </Grid>
                </Grid>
            </div>
        )}
    </Paper>
};

MovieDetail.propTypes = {
    movie: {
        title: PropTypes.string,
        poster_path: PropTypes.string,
        genres: PropTypes.array,
        overview: PropTypes.string,
        release_date: PropTypes.string,
        runtime: PropTypes.number
    },
    match: {
        params: {
            id: PropTypes.string
        }
    },
    onGetDetailedMovie: PropTypes.func,
    search: PropTypes.string,
    onDeselectMovie: PropTypes.func
}

const mapStateToProps = state => {
    return {
        movie: state.movie.selectedMovie,
        search: state.movie.search
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeselectMovie: () => dispatch({ type: actionTypes.DESELECT_MOVIE }),
        onGetDetailedMovie: (id, history) => dispatch(selectMovie(id, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
