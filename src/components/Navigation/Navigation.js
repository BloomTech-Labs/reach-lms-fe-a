import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//styled-components**
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #436ea5;
`;
const StyledLogo = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  width: 15vw;
  top: 15%;
  font-size: 2.2vw;
  &&:hover {
    color: red;
  }
`;
const StyledMenu = styled.div`
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
      <Link to="/">
        <StyledLogo>REACH LMS</StyledLogo>
      </Link>
      <StyledMenu>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon style={{ fontSize: 35 }} />
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
      </StyledMenu>
    </StyledNav>
  );
};

export default Navigation;
