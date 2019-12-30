import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles'
import logo from '../logo-pokemon.png';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const favorites = useSelector(state => state.favorites.items);

  function ListItemLink(props) {
    const { primary, to, selected } = props;
    const link = React.forwardRef((props, ref) => <Link to={to} {...props} />);

    return (
      <ListItem selected={selected} button component={link}>
        {props.children}
        <ListItemText primary={primary} />
      </ListItem>
    );
  }
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ textAlign: 'center', paddingTop: '5px' }}  >
        <img alt="logo" src={logo} />
      </div>
      <Divider />
      <List>
        <div onClick={event => handleListItemClick(event, 0)}>
          <ListItemLink  selected={selectedIndex === 0}  primary="Pokédex" to="/">
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
          </ListItemLink>
        </div>
        <div onClick={event => handleListItemClick(event, 1)}>
          <ListItemLink  selected={selectedIndex === 1}  primary="My Pokémons" to="/mypokemons">
            <ListItemIcon>
              <Badge badgeContent={favorites.length} color="primary"><FavoriteIcon /></Badge>
            </ListItemIcon>
          </ListItemLink>
        </div>


      </List>

    </div>
  );

  return (
    <div >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}


export default ResponsiveDrawer;
