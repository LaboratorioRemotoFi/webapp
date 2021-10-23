import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button,Card,CardMedia,CardContent,CardActions,CardActionArea,Link, Typography,Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 'auto',
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Link href='/horarios' style={{ textDecoration: 'none' }}>
        <Button className={classes.root}>
            <Card className={classes.root}>
                {/*<CardMedia
                className={classes.media}
                image="templative-reptile.jpg"
                title="Contemplative Reptile"
                />*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    Práctica 1
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Descripción de la práctica
                    </Typography>
                </CardContent>
            </Card>
        </Button>
    </Link>
  );
}