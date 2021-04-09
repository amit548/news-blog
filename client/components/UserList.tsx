import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/user/userSlice';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserList = ({ registeredUser }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{registeredUser.firstName[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${registeredUser.firstName} ${registeredUser.lastName}`}
            secondary={registeredUser.email}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                router.push(`/admin/edit-user/${registeredUser._id}`);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:4000/api/user/list/${registeredUser._id}`,
                    { withCredentials: true }
                  );
                  dispatch(deleteUser(registeredUser._id));
                } catch (error) {}
              }}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
};

export default UserList;
