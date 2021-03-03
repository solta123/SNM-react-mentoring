import './Searchbar.css';
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { search } from '../store/actionCreator';

const Searchbar = props => {
    const handleSubmit = event => {
        event.preventDefault();
        props.onSearch(document.getElementById('search')?.value);
    }

    return (
        <div className="SearchbarDiv">
            <form className="form" onSubmit={handleSubmit} >
                <TextField variant="outlined" id="search" name="search" type="text" label="Search" />
                <Button className="searchButton" color="primary" variant="contained"
                    type="submit">Search</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        search: state.movie.search
    };;
}

const mapDispatchToProps = dispatch => {
    return {
        onSearch: text => dispatch(search(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
