import { Box, Card, CardActionArea, Grid, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player';

const SideBar = () => {
  return (
    <Grid item xs={12} sm={6} md={12}>
      <Card variant="outlined">
        <CardActionArea>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                width="100%"
                height="70px"
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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
