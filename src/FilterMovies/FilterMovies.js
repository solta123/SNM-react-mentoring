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

const AppHeader = () => {
    const [tabValue, setTabValue] = React.useState(0);
    const [sortValue, setSortValue] = React.useState('Release date');
    const wrapper = React.createRef();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
    }

    return (
        <div className="FilterMoviesRoot" >
            <Toolbar>
                <Tabs value={tabValue} onChange={handleChange} indicatorColor="primary"
                    textColor="primary" variant="scrollable" scrollButtons="auto">
                    <Tab label="All" />
                    <Tab label="Documentary" />
                    <Tab label="Comedy" />
                    <Tab label="Horror" />
                    <Tab label="Crime" />
                </Tabs>
                <Divider orientation="vertical" flexItem />
                <FormControl ref={wrapper} className="FilterMoviesDivider">
                    <InputLabel id="sort-by">Sort by:</InputLabel>
                    <Select labelId="sort-by" id="sort-by-select" value={sortValue} onChange={handleSortChange}>
                        <MenuItem value={'Release date'}>Release date</MenuItem>
                        <MenuItem value={'Name'}>Name</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </div>
    );
}

export default AppHeader;