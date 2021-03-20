import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import { useRestfulFetch } from '../../hooks';

// css
import '../../styles/CourseCard.css';

const CourseCardLink = props => {
  const { href, children } = props;
  const { data: course } = useRestfulFetch(href);

  return (
    <div>
      {course ? (
        <Card
          title={
            <h3>
              <strong>Course —</strong> {course.coursename}
            </h3>
          }
          className="course-card"
        >
          <h4>
            <strong>Course Code:</strong> {course.coursecode}
          </h4>
          <p>
            <strong>Description:</strong> {course.coursedescription}
          </p>
          {children}
        </Card>
      ) : (
        <h2>Loading course...</h2>
      )}
    </div>
  );
};

export default CourseCardLink;
