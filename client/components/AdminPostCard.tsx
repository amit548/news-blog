import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const AdminPostCard = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4} md={4} lg={3}>
      <Card variant="outlined">
        <CardMedia image="/lucas.jpg" className={classes.media} />
        <CardContent>
          <Typography noWrap variant="h5" gutterBottom>
            Hello World
            <Typography variant="caption" color="textSecondary" component="div">
              Created by John Doe
            </Typography>
          </Typography>
          <Typography noWrap>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            optio porro esse nesciunt praesentium dicta, eaque debitis delectus
            eveniet. Rerum architecto doloremque odio tempora voluptatibus,
            totam inventore nesciunt neque repudiandae?
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AdminPostCard;
