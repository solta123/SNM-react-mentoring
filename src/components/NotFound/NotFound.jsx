import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center">
            <h2>Page not found</h2>
            <NavLink to="/">
                <Button variant="outlined" color="primary">
                    Back to Home screen
                </Button>
            </NavLink>
        </div>
    );
};

export default NotFound;
