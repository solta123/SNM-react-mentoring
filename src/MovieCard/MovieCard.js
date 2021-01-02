import './MovieCard.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const AppHeader = (props) => {
    return (
      <Card className="MovieCardRoot">
        <CardActionArea>
          <CardMedia className="media" image={props.img} title={props.title} />
          <CardContent className="details">
              <div>
                <Typography gutterBottom variant="h5" component="h4">
                    {props.title}
                </Typography>
                <Paper variant="outlined" className="year" color="textSecondary">{props.year}</Paper>
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
