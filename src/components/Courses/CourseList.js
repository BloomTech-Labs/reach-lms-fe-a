import React from 'react';
import { useSelector } from 'react-redux';

const CourseList = () => {
  // const courses = useSelector(state => state.courseReducer.courses_list);

  return (
    <div>
      <div>
        <h2>My Courses</h2>
      </div>
      <div>
        {/* {courses.map(course => {
          {
            return <CourseCard key={course.id} info={course} />
          }
        })} */}
      </div>
    </div>
  );
};

export default CourseList;
