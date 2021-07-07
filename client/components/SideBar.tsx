import ReactPlayer from 'react-player';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const SideBar = ({ video }) => {
  return (
    <Grid item xs={12} sm={6} md={12}>
      <Card variant="outlined">
        <CardActionArea
          onClick={() => {
            if (process.browser) {
              window.location.href = `/post/${video._id}`;
            }
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ReactPlayer
                url={video.videoUrl}
                width="100%"
                height="70px"
                controls={true}
              />
            </Grid>
            <Grid item xs={8}>
              <Box
                display="flex"
                style={{ height: '100%' }}
                alignItems="center"
                justifyContent="center"
              >
                <Typography noWrap variant="h6">
                  {video.title}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default SideBar;
