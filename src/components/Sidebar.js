import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const Sidebar = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          height: '100%',
          maxWidth: 360,
          backgroundColor: "theme.palette.background.paper",
        },
      }));

    const classes = useStyles();

    return (
       <div>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                {/* <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="Spam" />
                </ListItem> */}
            </List>
       </div>
    );
}
    
export default Sidebar;
  