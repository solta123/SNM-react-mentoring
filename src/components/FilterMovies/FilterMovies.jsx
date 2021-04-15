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
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FilterMovies = props => {
    const wrapper = React.createRef();
    const history = useHistory();
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');
    const tSource = 'NETFLIXROULETTE.FILTER_MOVIES.';

    const handleChange = (event, newValue) => {
        history.push({
            pathname: '/search',
            search: "?" +
                (window.location.search.includes('title') ? 'title=' + new URLSearchParams(window.location.search).get('title') + '&' : '') +
                'selectedGenre=' + newValue
        });
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
                    <Tab label={t('NETFLIXROULETTE.GENRES.ALL')} value="all" id="all" />
                    {genres.map(genre => {
                        return <Tab key={genre} label={t('NETFLIXROULETTE.GENRES.' + genre.toUpperCase())} value={genre} id={genre} />
                    })}
                </Tabs>
                <Divider orientation="vertical" flexItem id="Divider" />
                <FormControl ref={wrapper} id="SortButton">
                    <InputLabel id="sort-by">{t(tSource + 'SORT_BY')}</InputLabel>
                    <Select labelId="sort-by" id="sort-by-select" value={props.sortBy + '_' + props.sortOrder}
                        onChange={handleSortChange}>
                        <MenuItem id="release_date_asc" value={'release_date_asc'}>{t(tSource + 'RELEASE_DATE_ASC')}</MenuItem>
                        <MenuItem id="release_date_desc" value={'release_date_desc'}>{t(tSource + 'RELEASE_DATE_DESC')}</MenuItem>
                        <MenuItem id="title_asc" value={'title_asc'}>{t(tSource + 'TITLE_ASC')}</MenuItem>
                        <MenuItem id="title_desc" value={'title_desc'}>{t(tSource + 'TITLE_DESC')}</MenuItem>
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
