import { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditOutlined from '@material-ui/icons/EditOutlined';

import Redirect from '../../components/Redirect';
import { AuthContext } from '../../context/AuthContext';

const Admin = () => {
  const { isLoading, user } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);

  return user ? (
    <Grid container spacing={2}>
      {user && (
        <>
          <Grid item xs={12} md={6}>
            <Box>
              <Card variant="outlined">
                <CardHeader
                  avatar={<Avatar>{user.firstName[0]}</Avatar>}
                  title={`${user.firstName} ${user.lastName}`}
                  subheader={user.email}
                  action={
                    <IconButton onClick={() => setIsEditMode(!isEditMode)}>
                      <EditOutlined color="primary" />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box>
                    <Typography component="span">
                      Role:{' '}
                      <Typography component="span" variant="h6">
                        {user.role}
                      </Typography>
                    </Typography>
                  </Box>
                  {user.role === 'admin' && (
                    <Box>
                      <Typography component="span">
                        Total Created Users:{' '}
                        <Typography component="span" variant="h6">
                          {user.createdUsers.length || 0}
                        </Typography>
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography component="span">
                      Total Created Posts:{' '}
                      <Typography component="span" variant="h6">
                        {user.createdPosts.length || 0}
                      </Typography>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Card variant="outlined">
                <CardHeader
                  avatar={<Avatar>{user.firstName[0]}</Avatar>}
                  title={`${user.firstName} ${user.lastName}`}
                  subheader={user.email}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="First Name"
                        value={user.firstName}
                        focused={!!user.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Last Name"
                        value={user.lastName}
                        focused={!!user.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Email Address"
                        value={user.email}
                        focused={!!user.email}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Password"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Confirm Password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={!isEditMode}
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  ) : (
    !user && !isLoading && <Redirect to="/" />
  );
};

export default Admin;
