import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import CourseCard from './CourseCard';
import SearchPage from '../Search/SearchPage';

//ant d
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Button } from 'antd';

const { Heeader, Footer, Content } = Layout;

const CourseList = props => {
  const { course } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();
  const courseList = useSelector(state => state.courseReducer.courses_list);
  const currentProgram = useSelector(
    state => state.programReducer.currentProgram
  );

  return (
    <div>
      <div>
        <h1>{currentProgram.programname}</h1>
        <h2>My Courses</h2>
        <Link to="/add-course">
          <Button>Add Course</Button>
        </Link>
        <SearchPage />
      </div>
      <div>
        {courseList.map(course => {
          return <CourseCard key={course.id} course={course} />;
        })}
      </div>
    </div>
  );
};

export default CourseList;
