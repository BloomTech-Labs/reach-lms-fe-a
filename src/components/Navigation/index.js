import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../../styles/Nav.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation = props => {
  const classes = useStyles();
  let isMobile = useMediaQuery('(max-width: 800px)');
  const { authService } = props;

  // material ui menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav>
      <div className="navBar">
        <h1 className="logo">REACH</h1>
        {!isMobile && (
          <div>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link
              to="/logout"
              className="nav-link"
              onClick={() => authService.logout()}
            >
              Logout
            </Link>
          </div>
        )}
        {isMobile && (
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/profile">
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link to="/" onClick={() => authService.logout()}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Link>
            </Menu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
