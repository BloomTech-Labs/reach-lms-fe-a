import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//ant d
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Avatar, Image } from 'antd';

// css
import '../../styles/Profile.css';

//styled components
const StyledHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const StyledLogo = styled.h1`
  margin-bottom: 0;
  position: relative;
  font-size: 4vw;
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
    70% {
      width: 0%;
    }
    70%,
    90% {
      width: 100%;
    }
  }
`;

const StyledAvatar = styled.div`
  margin-right: 2%;
`;
const StyledDiv = styled.div`
  display: flex;
  margin-left: 10%;
  margin-top: 5%;
`;
const StyledMenu = styled.div`
  color: white;
  margin-left: 70%;
  @media (max-width: 550px) {
    margin-left: %;
  }
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

export default function UserProfile() {
  const user = useSelector(state => state.userReducer);
  const { push } = useHistory();
  const { Header, Footer, Content } = Layout;
  const { authService } = useOktaAuth();

  function clickOnEdit(e) {
    e.preventDefault();
    push('/edit-profile');
  }

  const classes = useStyles();

  // material ui menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Layout>
      <Header>
        <StyledHeader>
          <StyledAvatar>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              src={
                <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              size={50}
            />
          </StyledAvatar>
          <StyledLogo data-text="Profile...">Profile...</StyledLogo>
          <StyledMenu>
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
              <Link to="/">
                <MenuItem onClick={handleClose}>Home</MenuItem>
              </Link>
              <Link to="/" onClick={() => authService.logout()}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Link>
            </Menu>
          </StyledMenu>
        </StyledHeader>
      </Header>
      <Content>
        <StyledDiv>
          <Card
            title={user.firstname + ' ' + user.lastname}
            className="profile-card"
          >
            <h3>Role: {user.role}</h3>
            <p>Phone: {user.phonenumber}</p>
            <p>Email: {user.email}</p>
            <Button type="primary" onClick={e => clickOnEdit(e)}>
              Edit Profile
            </Button>
          </Card>
        </StyledDiv>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}
