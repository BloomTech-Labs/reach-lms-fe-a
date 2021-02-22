import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: #1282a2;
  align-items: center;
  width: 100vw;
  height: 14vh;
`;
const StyledLogo = styled.h1`
  font-size: 10vh;
  color: white;
`;
const StyledLink = styled.link`
  font-size: 2vh;
  color: white;
`;

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
    <StyledNav>
      <div className="navBar">
        <StyledLogo>REACH</StyledLogo>
        {!isMobile && (
          <div>
            <StyledLink to="/profile" className="nav-link">
              Profile
            </StyledLink>
            <StyledLink
              to="/logout"
              className="nav-link"
              onClick={() => authService.logout()}
            >
              Logout
            </StyledLink>
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
    </StyledNav>
  );
};

export default Navigation;
