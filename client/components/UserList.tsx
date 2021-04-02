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

const UserList = ({ registeredUser }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>J</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${registeredUser.firstName} ${registeredUser.lastName}`}
            secondary={registeredUser.email}
          />
          <ListItemSecondaryAction>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton>
              <DeleteIcon color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Grid>
  );
};

export default UserList;
