import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import WorkOffOutlinedIcon from '@material-ui/icons/WorkOffOutlined';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
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
    minHeight: '100%',
  },
  boxContainer: {
    minHeight: 'calc(100vh - 245px)',
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
        icon: <AddPhotoAlternateOutlinedIcon color="secondary" />,
      },
      {
        path: '/admin/posts',
        title: 'Manage Posts',
        icon: <PhotoAlbumOutlinedIcon color="secondary" />,
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
        path: '/news/সরকারি চাকরি',
        title: 'সরকারি চাকরি',
        icon: <WorkOutlineOutlinedIcon color="secondary" />,
      },
      {
        path: '/news/বেসরকারি চাকরি',
        title: 'বেসরকারি চাকরি',
        icon: <WorkOffOutlinedIcon color="secondary" />,
      },
      {
        path: '/news/পরীক্ষার প্রস্তুতি',
        title: 'পরীক্ষার প্রস্তুতি',
        icon: <ReceiptOutlinedIcon color="secondary" />,
      },
      // {
      //   path: '/news/রেজাল্ট',
      //   title: 'রেজাল্ট',
      //   icon: <SubtitlesOutlinedIcon color="secondary" />,
      // },
      {
        path: '/news/নোটিশ',
        title: 'নোটিশ',
        icon: <EventNoteOutlinedIcon color="secondary" />,
      },
    ];
  }

  const onDrawerOpen = () => setOpenDrawer(true);

  const onDrawerClose = () => setOpenDrawer(false);

  return (
    <Fragment>
      <Container maxWidth="md">
        <Box display="flex" m={1}>
          <Grid container spacing={4}>
            <Hidden smDown>
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
                  onClick={() => router.push('/')}
                />
              </Grid>
            </Hidden>
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
                onClick={() => router.push('/')}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>

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
                <Link href="/">
                  <Typography variant="h6" className={classes.title}>
                    কর্মের খোঁজ
                  </Typography>
                </Link>
              </Hidden>

              {user ? (
                <>
                  <Hidden smDown>
                    <Container>
                      {user && user.role === 'admin' && (
                        <>
                          <Link href="/admin/register">
                            <Button color="inherit">Create User</Button>
                          </Link>
                          <Link href="/admin/users">
                            <Button color="inherit">Manage Users</Button>
                          </Link>
                        </>
                      )}
                      <Link href="/admin/create-post">
                        <Button color="inherit">Create Post</Button>
                      </Link>
                      <Link href="/admin/posts">
                        <Button color="inherit">Manage Posts</Button>
                      </Link>
                    </Container>
                  </Hidden>
                  <Button
                    color="inherit"
                    onClick={() => {
                      logout();
                      router.push('/');
                      window.location.reload();
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
                        <Link href="/news/সরকারি চাকরি">
                          <Button color="inherit">সরকারি চাকরি</Button>
                        </Link>

                        <Link href="/news/বেসরকারি চাকরি">
                          <Button color="inherit">বেসরকারি চাকরি</Button>
                        </Link>

                        <Link href="/news/পরীক্ষার প্রস্তুতি">
                          <Button color="inherit">পরীক্ষার প্রস্তুতি</Button>
                        </Link>

                        <Link href="/news/রেজাল্ট">
                          <Button color="inherit">রেজাল্ট</Button>
                        </Link>

                        <Link href="/news/নোটিশ">
                          <Button color="inherit">নোটিশ</Button>
                        </Link>
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
              router.push('/');
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
                  <Link href="/about_us">
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      About US
                    </MatLink>
                  </Link>
                </Box>
                <Box marginRight={1}>
                  <Link href="/contact">
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      Contact
                    </MatLink>
                  </Link>
                </Box>
                <Box marginRight={1}>
                  <Link href="/dmca">
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      DMCA
                    </MatLink>
                  </Link>
                </Box>
                <Box marginRight={1}>
                  <Link href="/privacy_policy">
                    <MatLink color="textPrimary" style={{ cursor: 'pointer' }}>
                      Privacy Policy
                    </MatLink>
                  </Link>
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
