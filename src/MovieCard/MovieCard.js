import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
    },
    media: {
        height: 370,
    },
    details: {
        textAlign: 'left'
    },
    year: {
        padding: '5px',
        width: 32
    }
}));

const AppHeader = (props) => {
    const classes = useStyles();
  
    return (
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.img}
            title={props.title}
          />
          <CardContent className={classes.details}>
              <div>
                <Typography gutterBottom variant="h5" component="h4">
                    {props.title}
                </Typography>
                <Paper variant="outlined" className={classes.year} color="textSecondary">{props.year}</Paper>
              </div>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.genre}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

export default AppHeader;
