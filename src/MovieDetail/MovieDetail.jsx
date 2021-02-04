import React from 'react';
import { Grid } from '@material-ui/core';
import './MovieDetail.scss';

const MovieDetail = props => {
    // ide kell egy useeffect a props változására
    return <div>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <img src="https://images-na.ssl-images-amazon.com/images/I/71c05lTE03L._AC_SL1024_.jpg" alt="Pulp fiction" />
            </Grid>
            <Grid item xs={9}>
                sgdoiuofgsosgioisgoisdgoisgoisdgoijo
            </Grid>
        </Grid>
    </div>
};

export default MovieDetail;
