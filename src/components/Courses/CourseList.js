import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

const CourseList = () => {
  const courseList = useSelector(state => state.courseReducer.courses_list);
  const programId = useSelector(state => state.programReducer.viewProgramId);

  return (
    <div>
      <div>
        <h2>My Courses</h2>
        <Link to="/add-course">
          <button>Add Course</button>
        </Link>
      </div>
      <div>
        {console.log(programId)}
        {courseList.map(course => {
          {
            return <CourseCard key={course.id} info={course} />;
          }
        })}
      </div>
    </div>
  );
};

export default CourseList;
