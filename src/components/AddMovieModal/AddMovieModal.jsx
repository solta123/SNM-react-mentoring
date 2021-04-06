import './AddMovieModal.css';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { genres } from '../common/genres';
import { addMovie, editMovie } from '../store/actionCreator';
import { getEmptyMovie, mapMovie } from '../mapper/movieMapper';
import validate from './validate';
import PropTypes from 'prop-types';

const AddMovieModal = React.forwardRef((props, ref) => {
    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            ...props.movieDetail ? mapMovie({ ...props.movieDetail }) : getEmptyMovie(),
        },
        validate: values => validate(values, submitted),
        onSubmit: async values => {
            props.movieDetail ? props.onEdit({ ...values, id: props.movieDetail.id }) : props.onAdd(values);
        }
    });

    return <Paper ref={ref} className="ModalContainer">
        <div>
            <CloseIcon onClick={props.onCloseModal} className="closeIcon" />
            <Typography variant="h5">
                {props.movieDetail ? <span>Edit movie</span> : <span>Add movie</span>}
            </Typography>
        </div>

        <form onSubmit={formik.handleSubmit} className="AddMovieForm">
            <div>
                <TextField id="title" name="title" type="text" label="Title"
                    onChange={formik.handleChange} value={formik.values.title} />
            </div>
            {formik.errors.title ? <div id="title-error" className="error">{formik.errors.title}</div> : null}

            <div>
                <TextField label="Release date" InputLabelProps={{ shrink: true }} id="release_date"
                    name="release_date" type="date" onChange={formik.handleChange} value={formik.values.release_date} />
            </div>
            {formik.errors.release_date ? <div id="release_date-error" className="error">{formik.errors.release_date}</div> : null}

            <div>
                <TextField label="Movie URL" id="poster_path" name="poster_path" type="text"
                    onChange={formik.handleChange} value={formik.values.poster_path}
                />
            </div>
            {formik.errors.poster_path ? <div id="poster_path-error" className="error">{formik.errors.poster_path}</div> : null}

            <div>
                <FormControl>
                    <InputLabel>Genres</InputLabel>
                    <Select id="genres" name="genres" value={formik.values.genres} onChange={formik.handleChange} multiple>
                        {genres.map(genreItem => (
                            <MenuItem id={genreItem} key={genreItem} value={genreItem}>{genreItem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {formik.errors.genres ? <div id="genres-error" className="error">{formik.errors.genres}</div> : null}

            <div>
                <TextField label="Overview" id="overview" name="overview" type="text"
                    multiline rows={3} rowsMax={10} onChange={formik.handleChange} value={formik.values.overview} />
            </div>
            {formik.errors.overview ? <div id="overview-error" className="error">{formik.errors.overview}</div> : null}

            <div>
                <TextField label="Runtime" id="runtime" name="runtime" type="number"
                    onChange={formik.handleChange} value={formik.values.runtime} />
            </div>
            {formik.errors.runtime ? <div id="runtime-error" className="error">{formik.errors.runtime}</div> : null}

            <div>
                <Button variant="contained" color="primary" className="AddMovieFormButtons" type="submit"
                    id="AddMovieSubmit" onClick={() => setSubmitted(true)}>Submit</Button>
                <Button variant="contained" className="AddMovieFormButtons">Reset</Button>
            </div>
        </form>
    </Paper>
});

AddMovieModal.propTypes = {
    movieDetail: PropTypes.string,
    onEdit: PropTypes.func,
    onAdd: PropTypes.func,
    onCloseModal: PropTypes.func
}

const mapPropsToState = state => {
    return {
        movieDetail: state.movie.editableMovie
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEdit: (movie) => dispatch(editMovie(movie)),
        onAdd: (movie) => dispatch(addMovie(movie))
    };
};

export default connect(mapPropsToState, mapDispatchToProps)(AddMovieModal);