import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './MovieDetail.scss';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

const MovieDetail = props => {
    return <Paper className="MovieDetail">
        <SearchIcon onClick={() => props.onDeselectMovie()} />
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <img src={props.movie.img} alt={props.movie.title} />
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h3">{props.movie.title}</Typography>
                <Typography variant="subtitle1">
                    {props.movie.genre.map((genre, i) => {
                        if (i + 1 < props.movie.genre.length) {
                            return genre + ', ';
                        }
                        return genre;
                    })}
                </Typography>
                <Typography variant="h5">{props.movie.year.getFullYear()}, {props.movie.duration} min</Typography>
                <Typography variant="subtitle1">{props.movie.description}</Typography>
            </Grid>
        </Grid>
    </Paper>
};

const mapStateToProps = state => {
    return {
        movie: state.movie.selectedMovie
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeselectMovie: () => dispatch({type: actionTypes.DESELECT_MOVIE})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
