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
import PropTypes from 'prop-types';

const FilterMovies = props => {
    const wrapper = React.createRef();

    const handleChange = (event, newValue) => {
        props.onGenreClick(newValue);
    };

    const handleSortChange = (event) => {
        const text = event.target.value;
        const type = text.startsWith('r') ? 'release_date' : 'title'
        const sortOrder = text.endsWith('asc') ? 'asc' : 'desc';
        props.onSortSelect(type, sortOrder);
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
                    <Select labelId="sort-by" id="sort-by-select" value={props.sortBy + '_' + props.sortOrder}
                        onChange={handleSortChange}>
                        <MenuItem value={'release_date_asc'}>Release date asc</MenuItem>
                        <MenuItem value={'release_date_desc'}>Release date desc</MenuItem>
                        <MenuItem value={'title_asc'}>Name asc</MenuItem>
                        <MenuItem value={'title_desc'}>Name desc</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </div>
    );
}

FilterMovies.propTypes = {
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    selectedGenre: PropTypes.string,
    onSortSelect: PropTypes.func,
    onGenreClick: PropTypes.func
}

const mapStateToProps = state => {
    return {
        sortBy: state.movie.sortBy,
        sortOrder: state.movie.sortOrder,
        selectedGenre: state.movie.selectedGenre
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGenreClick: (genre, sorting) => dispatch(filterGenre(genre, sorting)),
        onSortSelect: (sortBy, sortOrder) => dispatch(sortMovies(sortBy, sortOrder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMovies);