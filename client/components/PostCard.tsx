import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            router.push(`/post/${post._id}`);
          }}
        >
          <CardMedia
            image={`//18.191.253.129/public/images/${post.thumbnailImage}`}
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
