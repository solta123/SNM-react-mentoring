import './Searchbar.css';
import React from 'react';
import { Button, TextField } from '@material-ui/core';

const Searchbar = () => {
    return (
        <div className="SearchbarDiv">
            <form className="form">
                <TextField variant="outlined" label="Search for movies"></TextField>
                <Button className="searchButton" color="primary" variant="contained">Search</Button>
            </form>
        </div>
    );
}

export default Searchbar;
