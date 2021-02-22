import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseList } from '../../state/actions/courseActions';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

const CourseList = () => {
  const currentProgramId = useSelector(
    state => state.programReducer.viewProgramId
  );
  const courseList = useSelector(state => state.courseReducer.CourseList);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosWithAuth()
      .get(`https://reach-team-a-be.herokuapp.com/courses/${currentProgramId}`)
      .then(res => {
        console.log(res);
        dispatch(setCourseList(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>My Courses</h2>
        <Link to="/add-course">
          <button>Add Course</button>
        </Link>
      </div>
      <div>
        {/* {courseList.map(course => {
          {
            return <CourseCard key={course.id} info={course} />
          }
        })} */}
      </div>
    </div>
  );
};

export default CourseList;
