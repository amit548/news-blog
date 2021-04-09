import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const PostCard = ({ post }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid item xs={12} sm={4}>
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            router.push(`/post/${post._id}`);
          }}
        >
          <CardMedia
            image={`http://localhost:4000/public/images/${post.thumbnailImage}`}
            title="News Paper"
            className={classes.media}
          />
          <CardContent style={{ height: 80 }}>
            <Box display="flex" alignItems="center" style={{ height: '100%' }}>
              <Typography color="textPrimary" className={classes.title}>
                {post.title}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PostCard;
