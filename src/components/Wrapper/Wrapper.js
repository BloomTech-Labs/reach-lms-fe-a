// this component will be used as a generalized wrapper component containing the navigation, footer, and overall style that we want for every page it is applied to
// this is to reduce the instances of unnecessary imports
import React from 'react';
import { Layout } from 'antd';
import { Navigation } from '../Navigation';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';

const LocationInfo = styled.div`
  margin: 24px;
  text-align: left;
  background-color: white;
`;

export default ({ children, ...restProps }) => {
  const { Content, Footer } = Layout;
  const { authService } = useOktaAuth();
  const { pathname } = useLocation();
  const { role } = useSelector(state => state.user);

  return (
    <Layout>
      <Layout>
        <Navigation authService={authService} />
        <Content>
          {/* should render the role and path on the main content rendering area */}
          <LocationInfo>{{}}</LocationInfo>

          {/*main content rendering area*/}
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Reach LMS ©2021</Footer>
    </Layout>
  );
};
