import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import CourseCard from './CourseCard';

import 'antd/dist/antd.css';
import { Button } from 'antd';

const CourseList = props => {
  const { course } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();
  const courseList = useSelector(state => state.courseReducer.courses_list);

  const viewCourseHandler = id => {
    axiosWithAuth()
      .get(
        `https://reach-team-a-be.herokuapp.com/modules/module/${course.courseid}`
      )
      .then(res => {
        console.log(res);
        console.log(id);
        // dispatch(setModuleList(res.data));
        // dispatch(setCourseId(id));
      })
      .catch(err => console.log(err));
    push('/modules');
  };

  return (
    <div>
      <div>
        <h2>My Courses</h2>
        <Link to="/add-course">
          <button>Add Course</button>
        </Link>
      </div>
      <div>
        {courseList.map(course => {
          return <CourseCard key={course.id} course={course} />;
        })}
      </div>
      <Button onClick={() => viewCourseHandler(course.courseid)} type="primary">
        View Course
      </Button>
    </div>
  );
};

export default CourseList;
