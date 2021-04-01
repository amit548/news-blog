import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const PostCard = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Card variant="outlined">
        <CardActionArea>
          <CardMedia
            image="/news-paper.jpg"
            title="News Paper"
            className={classes.media}
          />
          <CardContent>
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              className={classes.title}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              in ut voluptates modi sed porro doloremque nisi, id animi rem
              incidunt explicabo quibusdam accusamus possimus ipsa ullam culpa
              sunt ea?
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PostCard;
