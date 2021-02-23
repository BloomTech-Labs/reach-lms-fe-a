import React from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//styled-components**
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: none;
`;
const StyledLogo = styled.h1`
  position: relative;
  font-size: 6vw;
  color: #252839;
  -webkit-text-stroke: 0.3vw #383d52;
  text-transform: uppercase;
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #01fe87;
    -webkit-text-stroke: 0vw #383d52;
    border-right: 2px solid #01fe87;
    overflow: hidden;
    animation: animate 6s linear infinite;
  }
  @keyframes animate {
    0%,
    10%,
    100% {
      width: 0%;
    }
    70%,
    90% {
      width: 100%;
    }
  }
`;
const StyledMenu = styled.div``;

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
  // let isMobile = useMediaQuery('(max-width: 800px)');
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
      <StyledLogo data-text="Reach...">REACH...</StyledLogo>
      {/* {!isMobile && (
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
        )} */}
      {/* {isMobile && ( */}
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
      {/* )} */}
    </StyledNav>
  );
};

export default Navigation;
