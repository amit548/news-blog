import { Fragment, useContext, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
import MatLink from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WorkOutlineIcon from '@material-ui/icons/WorkRounded';
import WorkOffIcon from '@material-ui/icons/WorkOffRounded';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import NoteIcon from '@material-ui/icons/Note';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ApartmentIcon from '@material-ui/icons/Apartment';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import gray from '@material-ui/core/colors/grey';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TelegramIcon from '@material-ui/icons/Telegram';

import { AuthContext } from '../context/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
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
    minHeight: '100%',
  },
  boxContainer: {
    minHeight: 'calc(100vh - 150px)',
  },
  footer: {
    padding: theme.spacing(2),
    backgroundColor: gray[200],
    textAlign: 'center',
  },
  footerContent: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  const { user, logout } = useContext(AuthContext);

  const [openDrawer, setOpenDrawer] = useState(false);

  let drawerList = [];

  if (user) {
    drawerList = [
      {
        path: '/admin/create-post',
        title: 'Create Posts',
        icon: <AddPhotoAlternateIcon color="secondary" />,
      },
      {
        path: '/admin/posts',
        title: 'Manage Posts',
        icon: <PhotoAlbumIcon color="secondary" />,
      },
    ];

    if (user.role === 'admin')
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
        path: '/news/সরকারি চাকরি/1',
        title: 'সরকারি চাকরি',
        icon: <WorkOutlineIcon color="secondary" />,
      },
      {
        path: '/news/বেসরকারি চাকরি/1',
        title: 'বেসরকারি চাকরি',
        icon: <WorkOffIcon color="secondary" />,
      },
      {
        path: '/news/পার্ট টাইম জব/1',
        title: 'পার্ট টাইম জব',
        icon: <ApartmentIcon color="secondary" />,
      },
      {
        path: '/news/পরীক্ষার প্রস্তুতি/1',
        title: 'পরীক্ষার প্রস্তুতি',
        icon: <MenuBookIcon color="secondary" />,
      },
      // {
      //   path: '/news/রেজাল্ট/1',
      //   title: 'রেজাল্ট',
      //   icon: <MenuBookIcon color="secondary" />,
      // },
      {
        path: '/news/নোটিশ/1',
        title: 'নোটিশ',
        icon: <NoteIcon color="secondary" />,
      },
    ];
  }

  const onDrawerOpen = () => setOpenDrawer(true);

  const onDrawerClose = () => setOpenDrawer(false);

  return (
    <Fragment>
      <Hidden smDown>
        <Container maxWidth="md">
          <Box display="flex" m={1}>
            <Grid container spacing={4}>
              <Grid item md={4}>
                <img
                  src="/main_header.jpg"
                  style={{
                    objectPosition: 'center',
                    objectFit: 'cover',
                    height: '100%',
                    width: '300px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (process.browser) {
                      window.location.href = '/';
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <img
                  src="/side_header.jpg"
                  style={{
                    objectPosition: 'center',
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (process.browser) {
                      window.location.href = '/';
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Hidden>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Box>
          <AppBar position="sticky">
            <Toolbar>
              <Hidden mdUp>
                <IconButton color="inherit" onClick={() => onDrawerOpen()}>
                  <MenuIcon />
                </IconButton>
                <div className={classes.title}>
                  <a href="/">
                    <img
                      src="/side_header.jpg"
                      style={{
                        height: 'inherit',
                        marginLeft: '16px',
                        width: '250px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        if (process.browser) {
                          window.location.href = '/';
                        }
                      }}
                    />
                  </a>
                </div>
              </Hidden>

              {user ? (
                <>
                  <Hidden smDown>
                    <Container>
                      {user && user.role === 'admin' && (
                        <>
                          <a
                            style={{ color: 'white', textDecoration: 'none' }}
                            href="/admin/register"
                          >
                            <Button color="inherit">Create User</Button>
                          </a>
                          <a
                            style={{ color: 'white', textDecoration: 'none' }}
                            href="/admin/users"
                          >
                            <Button color="inherit">Manage Users</Button>
                          </a>
                        </>
                      )}
                      <a
                        style={{ color: 'white', textDecoration: 'none' }}
                        href="/admin/create-post"
                      >
                        <Button color="inherit">Create Post</Button>
                      </a>
                      <a
                        style={{ color: 'white', textDecoration: 'none' }}
                        href="/admin/posts"
                      >
                        <Button color="inherit">Manage Posts</Button>
                      </a>
                    </Container>
                  </Hidden>
                  <Button
                    color="inherit"
                    onClick={() => {
                      logout();
                      if (process.browser) {
                        window.location.href = '/';
                      }
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Hidden smDown>
                  <Container>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box>
                        <a
                          href="/news/সরকারি চাকরি/1"
                          style={{ color: 'white', textDecoration: 'none' }}
                        >
                          <Button color="inherit">সরকারি চাকরি</Button>
                        </a>

                        <a
                          style={{ color: 'white', textDecoration: 'none' }}
                          href="/news/বেসরকারি চাকরি/1"
                        >
                          <Button color="inherit">বেসরকারি চাকরি</Button>
                        </a>

                        <a
                          style={{ color: 'white', textDecoration: 'none' }}
                          href="/news/পার্ট টাইম জব/1"
                        >
                          <Button color="inherit">পার্ট টাইম জব</Button>
                        </a>

                        <a
                          style={{ color: 'white', textDecoration: 'none' }}
                          href="/news/পরীক্ষার প্রস্তুতি/1"
                        >
                          <Button color="inherit">পরীক্ষার প্রস্তুতি</Button>
                        </a>

                        {/* <a style={{ color: 'white', textDecoration: 'none' }} href="/news/রেজাল্ট/1">
                          <Button color="inherit">রেজাল্ট</Button>
                        </a> */}

                        <a
                          style={{ color: 'white', textDecoration: 'none' }}
                          href="/news/নোটিশ/1"
                        >
                          <Button color="inherit">নোটিশ</Button>
                        </a>
                      </Box>
                      <Box>
                        <IconButton
                          color="inherit"
                          target="_blank"
                          href="https://youtube.com/channel/UCwesWP_4_HtQkxv5gFUsTmA"
                        >
                          <YouTubeIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          target="_blank"
                          href="https://m.facebook.com/%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%AE%E0%A7%87%E0%A6%B0-%E0%A6%96%E0%A7%8B%E0%A6%81%E0%A6%9C-100330405569011/"
                        >
                          <FacebookIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          target="_blank"
                          href="https://t.me/kormerkhoj"
                        >
                          <TelegramIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Container>
                </Hidden>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer
          anchor="left"
          open={openDrawer}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          onClose={() => onDrawerClose()}
        >
          <img
            src="/main_header.jpg"
            style={{
              objectPosition: 'center',
              objectFit: 'fill',
              height: '100px',
              width: '100%',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (process.browser) {
                window.location.href = '/';
              }
              setOpenDrawer(false);
            }}
          />
          <Box display="flex" justifyContent="center">
            <ButtonGroup size="medium">
              <IconButton
                color="primary"
                target="_blank"
                href="https://youtube.com/channel/UCwesWP_4_HtQkxv5gFUsTmA"
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                style={{ color: blue[500] }}
                target="_blank"
                href="https://m.facebook.com/%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%AE%E0%A7%87%E0%A6%B0-%E0%A6%96%E0%A7%8B%E0%A6%81%E0%A6%9C-100330405569011/"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                style={{ color: cyan[500] }}
                target="_blank"
                href="https://t.me/kormerkhoj"
              >
                <TelegramIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
          <List>
            {drawerList.map((item) => (
              <ListItem
                button
                key={item.title}
                className={
                  router.pathname === item.path ? classes.active : null
                }
                onClick={() => {
                  onDrawerClose();

                  if (process.browser) {
                    window.location.href = item.path;
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container maxWidth="lg" className={classes.container}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.boxContainer}
          >
            {children}
          </Box>
        </Container>
        <footer className={classes.footer}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography>
                kormerkhoj.com &copy; {new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <Box marginRight={1}>
                  <a href="/about_us" style={{ textDecoration: 'none' }}>
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      About Us
                    </MatLink>
                  </a>
                </Box>
                <Box marginRight={1}>
                  <a href="/contact_us" style={{ textDecoration: 'none' }}>
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      Contact Us
                    </MatLink>
                  </a>
                </Box>
                <Box marginRight={1}>
                  <a href="/dmca" style={{ textDecoration: 'none' }}>
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      DMCA
                    </MatLink>
                  </a>
                </Box>
                <Box marginRight={1}>
                  <a href="/privacy_policy" style={{ textDecoration: 'none' }}>
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      Privacy Policy
                    </MatLink>
                  </a>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </footer>
      </Box>
    </Fragment>
  );
};

export default Layout;
