import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';

const CourseList = () => {
  const courseList = useSelector(state => state.courseReducer.courses_list);

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
    </div>
  );
};

export default CourseList;
