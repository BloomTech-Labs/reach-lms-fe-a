import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { connect } from 'react-redux';

// ant Design
import { Button } from 'antd';

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

          {props.userInfo.role === 'admin' ? (
            <div>{/*map programs here for admins */}</div>
          ) : (
            <div>{/* map courses here for students and teachers */}</div>
          )}

          <div>
            <h2>My Programs</h2>
            <Button type="primary" shape="round" color="blue">
              Add Program
            </Button>
          </div>

          <div>
            <h2>My Courses</h2>
            <Button type="primary" shape="round" color="blue">
              Add Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderHomePage;
