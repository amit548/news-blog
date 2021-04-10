import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const AdminPostCard = ({ post, setPosts, setLoading, setError }) => {
  const classes = useStyles();
  const router = useRouter();

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
    <Grid item xs={12} sm={6} md={4}>
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
          <IconButton
            color="primary"
            onClick={() => {
              router.push(`/admin/edit-post/${post._id}`);
            }}
          >
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
