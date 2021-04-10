import Link from 'next/link';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import SubtitlesOutlinedIcon from '@material-ui/icons/SubtitlesOutlined';
import WorkOffOutlinedIcon from '@material-ui/icons/WorkOffOutlined';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import {
  loadingData,
  login,
  loginError,
  logout,
} from '../features/auth/authSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerTitle: {
    padding: theme.spacing(2),
  },
  active: {
    backgroundColor: '#f4f4f4',
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(loadingData());
      try {
        const response = await axios.get('http://localhost:4000/api/me', {
          withCredentials: true,
        });
        dispatch(login(response.data));
      } catch (error) {
        error.response && dispatch(loginError(error.response.data.body));
      }
    })();
  }, []);

  const authData = useSelector((state: any) => state.auth);

  const [openDrawer, setOpenDrawer] = useState(false);

  let drawerList = [];

  if (authData.user) {
    drawerList = [
      {
        path: '/admin/create-post',
        title: 'Create Posts',
        icon: <AddPhotoAlternateOutlinedIcon color="secondary" />,
      },
      {
        path: '/admin/posts',
        title: 'Manage Posts',
        icon: <PhotoAlbumOutlinedIcon color="secondary" />,
      },
    ];

    if (authData.user.role === 'admin')
      drawerList.unshift(
        {
          path: '/admin/register',
          title: 'Create User',
          icon: <PersonAddIcon color="secondary" />,
        },
        {
          path: '/admin/users',
          title: 'Manage Users',
          icon: <PeopleAltIcon color="secondary" />,
        }
      );
  } else {
    drawerList = [
      {
        path: '/admin/register',
        title: 'সরকারি চাকরি',
        icon: <WorkOutlineOutlinedIcon color="secondary" />,
      },
      {
        path: '/admin/register',
        title: 'বেসরকারি চাকরি',
        icon: <WorkOffOutlinedIcon color="secondary" />,
      },
      {
        path: '/admin/register',
        title: 'পরীক্ষার সিলেবাস',
        icon: <ReceiptOutlinedIcon color="secondary" />,
      },
      {
        path: '/admin/register',
        title: 'রেজাল্ট',
        icon: <SubtitlesOutlinedIcon color="secondary" />,
      },
      {
        path: '/admin/register',
        title: 'নোটিশ',
        icon: <EventNoteOutlinedIcon color="secondary" />,
      },
    ];
  }

  const onDrawerOpen = () => setOpenDrawer(true);

  const onDrawerClose = () => setOpenDrawer(false);

  const logoutUser = async () => {
    try {
      await axios.post(
        'http://localhost:4000/api/user/logout',
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      await router.push('/');
    } catch (_) {}
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Hidden mdUp>
            <IconButton color="inherit" onClick={() => onDrawerOpen()}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              কর্মের খোঁজ
            </Typography>
          </Link>

          {authData.user ? (
            <>
              <Hidden smDown>
                {authData.user && authData.user.role === 'admin' && (
                  <>
                    <Link href="/admin/register">
                      <Button>Create User</Button>
                    </Link>
                    <Link href="/admin/users">
                      <Button>Manage Users</Button>
                    </Link>
                  </>
                )}
                <Link href="/admin/create-post">
                  <Button>Create Post</Button>
                </Link>
                <Link href="/admin/posts">
                  <Button>Manage Posts</Button>
                </Link>
              </Hidden>
              <Button color="inherit" onClick={logoutUser}>
                Logout
              </Button>
            </>
          ) : (
            <Hidden smDown>
              <Link href="/">
                <Button>সরকারি চাকরি</Button>
              </Link>

              <Link href="/">
                <Button>বেসরকারি চাকরি</Button>
              </Link>

              <Link href="/">
                <Button>পরীক্ষার সিলেবাস</Button>
              </Link>

              <Link href="/">
                <Button>রেজাল্ট</Button>
              </Link>

              <Link href="/">
                <Button>নোটিশ</Button>
              </Link>
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        onClose={() => onDrawerClose()}
      >
        <Typography variant="h6" className={classes.drawerTitle}>
          কর্মের খোঁজ
        </Typography>
        <List>
          {drawerList.map((item) => (
            <ListItem
              button
              key={item.title}
              className={router.pathname === item.path ? classes.active : null}
              onClick={() => {
                onDrawerClose();
                router.push(item.path);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
