import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common';
import Header from '../Header';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div>
      <Header userInfo={userInfo} authService={authService} />
      <div>
        <h1>Hi {userInfo.name} Welcome to Reach!</h1>
        <div>
          {/* 
            When I log in, I want to display data according to my userrole(admin, teacher, student).
            -- admin will see programs
            -- teacher and student will see courses
            -- i need to fetch the programs/courses that match to each individual.
            -- I can pull all the data and filter, or the data is filtered on the backend. I think backend should filter it..
            -- fetch userInfo from backend, then use userinfo to fetch program/courses for each individual.
            1. Create redux boilerplate files.
            2. Create dummy data to practice.
            3. write code for api calls, etc.
          */}
          <p>
            This is an example of a common example of how we'd like for you to
            approach components.
          </p>
          <p>
            <Link to="/profile-list">Profiles Example</Link>
          </p>
          <p>
            <Link to="/example-list">Example List of Items</Link>
          </p>
          <p>
            <Link to="/datavis">Data Visualizations Example</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default RenderHomePage;
