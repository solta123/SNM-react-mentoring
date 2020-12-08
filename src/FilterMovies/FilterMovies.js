import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabs : {
        maxWidth: '70%'
    },
    sortButton: {
        minWidth: '150px'
    },
    divider : {
        padding: "4px"
    }
}));

const AppHeader = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSelectChange = (event) => {
        console.log(event);
    }

    return ( 
        <div className = { classes.root } >
            <Toolbar>
                <Tabs value = { tabValue } onChange = { handleChange } indicatorColor="primary"
                    textColor="primary" variant="scrollable" scrollButtons="auto">
                    <Tab label = "All" />
                    <Tab label = "Documentary" />
                    <Tab label = "Comedy"  />
                    <Tab label = "Horror" />
                    <Tab label = "Crime" />
                </Tabs>
                <Divider orientation="vertical" flexItem />
                <Button className={classes.sortButton}>
                    <FormControl>
                        <InputLabel id="sort-by">Sort by:</InputLabel>
                        <Select labelId="sort-by" id="sort-by-select" onChange={handleSelectChange} value={'Release date'}>
                            <MenuItem value={'Release date'}>Release date</MenuItem>
                            <MenuItem value={'Name'}>Name</MenuItem>
                        </Select>
                    </FormControl>
                </Button>
            </Toolbar>
        </div>
    );
}

export default AppHeader;