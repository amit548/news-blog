import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import SubtitlesOutlinedIcon from '@material-ui/icons/SubtitlesOutlined';
import WorkOffOutlinedIcon from '@material-ui/icons/WorkOffOutlined';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';

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

  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerList = [
    {
      path: '/admin/register',
      title: 'Create User',
      icon: <PersonAddIcon color="secondary" />,
    },
    {
      path: '/admin/users',
      title: 'Manage Users',
      icon: <PeopleAltIcon color="secondary" />,
    },
    {
      path: '/admin/posts',
      title: 'Manage Posts',
      icon: <PhotoAlbumOutlinedIcon color="secondary" />,
    },
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
      title: 'পরিক্ষার সিলেবাস',
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

  const onDrawerOpen = () => setOpenDrawer(true);

  const onDrawerClose = () => setOpenDrawer(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" onClick={() => onDrawerOpen()}>
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              কর্মের খোঁজ
            </Typography>
          </Link>
          <Link href="/admin/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link href="/login">
            <Button color="inherit">Logout</Button>
          </Link>
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
      <Container maxWidth="xl" className={classes.container}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
