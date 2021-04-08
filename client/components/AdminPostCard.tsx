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
import axios from 'axios';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const AdminPostCard = ({ post, setPosts, setLoading, setError }) => {
  const classes = useStyles();

  const handlePostDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/post/${id}`, {
        withCredentials: true,
      });
      setPosts((prevPost: any) =>
        prevPost.filter((_post: any) => _post._id !== id)
      );
      setError({});
      setLoading(false);
    } catch (error) {
      if (error.response)
        setError({
          ...error.response.data.body,
        });
      setLoading(false);
    }
  };

  const fullName = `${post.creator.firstName} ${post.creator.lastName}`;

  return (
    <Grid item xs={12} sm={4} md={4} lg={3}>
      <Card variant="outlined">
        <CardMedia
          image={`http://localhost:4000/public/images/${post.thumbnailImage}`}
          className={classes.media}
        />
        <CardContent>
          <Typography noWrap variant="h5">
            {post.title}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="div">
            Created by {fullName}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={handlePostDelete.bind(this, post._id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AdminPostCard;
