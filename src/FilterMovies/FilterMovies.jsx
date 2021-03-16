import './FilterMovies.css';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import { genres } from '../common/genres';
import { connect } from 'react-redux';
import { filterGenre, sortMovies } from '../store/actionCreator';

const FilterMovies = props => {
    const wrapper = React.createRef();

    const handleChange = (event, newValue) => {
        props.onGenreClick(newValue);
    };

    const handleSortChange = (event) => {
        props.onSortSelect(event.target.value);
    }

    return (
        <div className="FilterMoviesRoot" >
            <Toolbar>
                <Tabs value={props.selectedGenre} onChange={handleChange} indicatorColor="primary"
                    textColor="primary" variant="scrollable" scrollButtons="auto">
                    <Tab label="All" value="all" />
                    {genres.map(genre => {
                        return <Tab key={genre} label={genre} value={genre} id={genre} />
                    })}
                </Tabs>
                <Divider orientation="vertical" flexItem id="Divider" />
                <FormControl ref={wrapper} id="SortButton">
                    <InputLabel id="sort-by">Sort by:</InputLabel>
                    <Select labelId="sort-by" id="sort-by-select" value={props.sortBy} onChange={handleSortChange}>
                        <MenuItem value={'release_date'}>Release date</MenuItem>
                        <MenuItem value={'title'}>Name</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        sortBy: state.movie.sortBy,
        selectedGenre: state.movie.selectedGenre
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGenreClick: (genre) => dispatch(filterGenre(genre)),
        onSortSelect: (sortBy) => dispatch(sortMovies(sortBy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMovies);