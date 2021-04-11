import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Redirect from '../../components/Redirect';

const Admin = () => {
  const authData = useSelector((state: any) => state.auth);

  return authData.user ? (
    <Grid container spacing={2}>
      {authData.user && (
        <Grid item xs={12} md={6}>
          <Box>
            <Card variant="outlined">
              <CardHeader
                avatar={<Avatar>{authData.user.firstName[0]}</Avatar>}
                title={`${authData.user.firstName} ${authData.user.lastName}`}
                subheader={authData.user.email}
              />
              <CardContent>
                <Box>
                  <Typography component="span">
                    Role:{' '}
                    <Typography component="span" variant="h6">
                      {authData.user.role}
                    </Typography>
                  </Typography>
                </Box>
                {authData.user.role === 'admin' && (
                  <Box>
                    <Typography component="span">
                      Total Created Users:{' '}
                      <Typography component="span" variant="h6">
                        {authData.user.createdUsers.length || 0}
                      </Typography>
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography component="span">
                    Total Created Posts:{' '}
                    <Typography component="span" variant="h6">
                      {authData.user.createdPosts.length || 0}
                    </Typography>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      )}
    </Grid>
  ) : (
    !authData.isLoading && <Redirect to="/" />
  );
};

export default Admin;
