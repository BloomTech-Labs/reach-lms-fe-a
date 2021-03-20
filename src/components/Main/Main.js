import React from 'react';
import { useSubModal } from '../../hooks';
import { RestEntity } from '../_common';
import CourseListLink from '../Courses/CourseListLink';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import CourseCardLink from '../Courses/CourseCardLink';
import EditCourseForm from '../Courses/REST_EditCourseForm';

const Main = props => {
  const { href } = props;
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const courseEdit = useSubModal();

  return (
    <>
      <h2>My Courses</h2>
      <RestEntity href={href ?? '/courses'}>
        <RestEntity.List
          path={['courseList']}
          container={CourseListLink}
          component={subEntity => (
            <>
              <CourseCardLink
                key={subEntity._links.self.href}
                href={subEntity._links.self.href}
              >
                <Button
                  onClick={() => {
                    setSelectedCourse(subEntity._links.self.href);
                    courseEdit.showModal();
                  }}
                >
                  Edit Course
                </Button>
              </CourseCardLink>
            </>
          )}
        />
        <RestEntity.Error>
          <div>There's been a problem!</div>
        </RestEntity.Error>
        <RestEntity.Loading>
          <div>Loading Courses...</div>
        </RestEntity.Loading>
      </RestEntity>
      {/* Edit Course Model */}
      <Modal
        title="Edit Course"
        width="90vw"
        visible={courseEdit.visible}
        onCancel={courseEdit.hideModal}
      >
        <EditCourseForm href={selectedCourse} />
      </Modal>
    </>
  );
};

export default Main;
