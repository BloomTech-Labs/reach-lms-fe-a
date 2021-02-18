import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../../styles/Nav.css';

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
  let [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const { authService } = props;

  return (
    <nav>
      <div className="navBar">
        <h1 className="logo">REACH</h1>
        {!isMobile && (
          <div>
            <Link href="/profile">
              <a className="nav-link">Profile</a>
            </Link>
            <Link href="/logout">
              <a className="nav-link" onClick={() => authService.logout()}>
                Logout
              </a>
            </Link>
          </div>
        )}
      </div>
      {isMobile && (
        <>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon
              onClick={() => {
                setMobileMenuExpanded(!mobileMenuExpanded);
              }}
            />
          </IconButton>
          {/* <Hamburger
            isActive={mobileMenuExpanded}
            onClick={() => {
              setMobileMenuExpanded(!mobileMenuExpanded);
            }}
            theme={theme}
          /> */}
          {mobileMenuExpanded && (
            <div>
              <ul>
                <li>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href="/logout">
                    <a onClick={() => authService.logout()}>Logout</a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

// function DesktopView() {
//     const { userInfo, authService } = props;

//     return (
//       <div>
//         <Link to="/profile">
//           <a>Profile</a>
//         </Link>
//         <Link href="/logout">
//                 <a onClick={() => authService.logout()}>Logout</a>
//         </Link>
//       </div>
//     );

// }

export default Navigation;
