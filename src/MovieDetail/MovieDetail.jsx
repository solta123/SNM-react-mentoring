import React, { useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './MovieDetail.scss';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMovie } from '../store/actionCreator';

const MovieDetail = props => {

    useEffect(() => {
        if (!props.movie) {
            props.onGetDetailedMovie(props.match.params.id);
        }
    }, [])

    return <Paper className="MovieDetail">
        {!props.movie ? <i>Loading...</i> : (
            <div>
                <Link to="/">
                    <SearchIcon onClick={() => props.onDeselectMovie()} />
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

const mapStateToProps = state => {
    return {
        movie: state.movie.selectedMovie
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeselectMovie: () => dispatch({ type: actionTypes.DESELECT_MOVIE }),
        onGetDetailedMovie: id => dispatch(selectMovie(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
