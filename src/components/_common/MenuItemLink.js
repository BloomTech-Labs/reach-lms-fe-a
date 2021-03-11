import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Wrap `Menu.Item` from AntD in a `Link` from react-router-dom
// We can just toss in a "to" attribute to MenuItem
// and it will look like an AntD Menu.Item but act like a Link
const MenuItemLink = ({ key, to, icon, handleClick, children, ...props }) => {
  if (!to) {
    return (
      <Menu.Item key={key} icon={icon} onClick={handleClick} {...props}>
        {children}
      </Menu.Item>
    );
  }
  return (
    <StyledLink to={to}>
      <Menu.Item key={key} icon={icon} onClick={handleClick} {...props}>
        {children}
      </Menu.Item>
    </StyledLink>
  );
};

export default MenuItemLink;
