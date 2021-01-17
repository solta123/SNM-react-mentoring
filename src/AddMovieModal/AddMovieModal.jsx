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

const AddMovieModal = React.forwardRef((props, ref) => {
    const [genre, setGenre] = React.useState([]);

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const genres = [
        'Documentary', 'Comedy', 'Horror', 'Crime', 'Action', 'Adventure', 'Drama', 'Oscar winning movie', 'Musical', 'Sci-fi'
    ];
    const releaseDate = props.movieDetail ? props.movieDetail.year.getFullYear() + '-' + (props.movieDetail.year.getMonth() > 9 ? '' : '0')
        + props.movieDetail.year.getMonth() + '-' + props.movieDetail.year.getDate() : '';

    if (props.movieDetail?.id) {
        return <Paper ref={ref} className="ModalContainer">
            <div>
                <CloseIcon onClick={props.onCloseModal} className="closeIcon" />
                <Typography variant="h5">Edit Movie</Typography>
            </div>
            <form className="AddMovieForm">
                <div>
                    <TextField label="ID" value={props.movieDetail.id} disabled />
                </div>
                <div>
                    <TextField label="Title" value={props.movieDetail.title} />
                </div>
                <div>
                    <TextField label="Release date" type="date" InputLabelProps={{ shrink: true }}
                        value={releaseDate} />
                </div>
                <div>
                    <TextField label="Movie URL" />
                </div>
                <div>
                    <FormControl>
                        <InputLabel>Genre</InputLabel>
                        <Select onChange={handleGenreChange} multiple value={props.movieDetail.genre}>
                            {genres.map(genreItem => (
                                <MenuItem key={genreItem} value={genreItem}>{genreItem}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField label="Overview" multiline rows={3} rowsMax={10} />
                </div>
                <div>
                    <TextField label="Runtime" type="number" value={props.movieDetail.duration} />
                </div>
                <div>
                    <Button variant="contained" color="primary" className="AddMovieFormButtons">Submit</Button>
                    <Button variant="contained" className="AddMovieFormButtons">Reset</Button>
                </div>
            </form>
        </Paper>
    }

    return <Paper ref={ref} className="ModalContainer">
        <div>
            <CloseIcon onClick={props.onCloseModal} className="closeIcon" />
            <Typography variant="h5">Add Movie</Typography>
        </div>
        <form className="AddMovieForm">
            <div>
                <TextField label="Title" />
            </div>
            <div>
                <TextField label="Release date" type="date" InputLabelProps={{ shrink: true }} />
            </div>
            <div>
                <TextField label="Movie URL" />
            </div>
            <div>
                <FormControl>
                    <InputLabel>Genre</InputLabel>
                    <Select value={genre} onChange={handleGenreChange} multiple>
                        {genres.map(genreItem => (
                            <MenuItem key={genreItem} value={genreItem}>{genreItem}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <TextField label="Overview" multiline rows={3} rowsMax={10} />
            </div>
            <div>
                <TextField label="Runtime" type="number" />
            </div>
            <div>
                <Button variant="contained" color="primary" className="AddMovieFormButtons">Submit</Button>
                <Button variant="contained" className="AddMovieFormButtons">Reset</Button>
            </div>
        </form>
    </Paper>
});

export default AddMovieModal;
