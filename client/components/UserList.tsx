import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteUser } from '../features/user/userSlice';

const UserList = ({ registeredUser }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Grid item xs={12} sm={6}>
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
