import './AddMovieModal.css';
import React from 'react';
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
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import { genres } from '../common/genres';

const AddMovieModal = React.forwardRef((props, ref) => {
    const formatDate = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() > 9 ? '' : '0')
            + date.getMonth() + '-' + date.getDate()
    }

    const validate = values => {
        const errors = {};

        if (!values.title) {
            errors.title = 'Required title';
        }

        if (!values.year) {
            errors.year = 'Required release date';
        }

        if (!values.img) {
            errors.img = 'Required to add a link to an image';
        }

        if (values.duration < 0) {
            errors.duration = 'Hmm, this seems a little short...';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: props.movieDetail?.id ? { ...props.movieDetail, year: formatDate(props.movieDetail.year) } : {
            id: Math.floor(Math.random() * 100000),
            title: '',
            year: formatDate(new Date()),
            genre: [],
            img: '',
            duration: 0,
            description: ''
        },
        validate,
        onSubmit: values => {
            const movie = {...values, year: new Date(values.year)}
            props.movieDetail ? props.onEdit(movie) : props.onAdd(movie)
            props.onCloseModal();
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
            {formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}

            <div>
                <TextField label="Release date" InputLabelProps={{ shrink: true }} id="year"
                    name="year" type="date" onChange={formik.handleChange} value={formik.values.year} />
            </div>
            {formik.errors.year ? <div className="error">{formik.errors.year}</div> : null}

            <div>
                <TextField label="Movie URL" id="img" name="img" type="text"
                    onChange={formik.handleChange} value={formik.values.img}
                />
            </div>
            {formik.errors.img ? <div className="error">{formik.errors.img}</div> : null}

            <div>
                <FormControl>
                    <InputLabel>Genre</InputLabel>
                    <Select id="genre" name="genre" value={formik.values.genre} onChange={formik.handleChange} multiple>
                        {genres.map(genreItem => (
                            <MenuItem key={genreItem} value={genreItem}>{genreItem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <TextField label="Overview" id="description" name="description" type="text"
                    multiline rows={3} rowsMax={10} onChange={formik.handleChange} value={formik.values.description} />
            </div>

            <div>
                <TextField label="Runtime" id="duration" name="duration" type="number"
                    onChange={formik.handleChange} value={formik.values.duration} />
            </div>
            {formik.errors.duration ? <div className="error">{formik.errors.duration}</div> : null}

            <div>
                <Button variant="contained" color="primary" className="AddMovieFormButtons" type="submit">Submit</Button>
                <Button variant="contained" className="AddMovieFormButtons">Reset</Button>
            </div>
        </form>
    </Paper>
});

const mapDispatchToProps = dispatch => {
    return {
        onEdit: (movie) => dispatch({ type: actionTypes.EDIT, movie: movie }),
        onAdd: (movie) => dispatch({ type: actionTypes.ADD, movie: movie })
    }
}

export default connect(null, mapDispatchToProps)(AddMovieModal);
