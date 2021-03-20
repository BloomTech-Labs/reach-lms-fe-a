import React from 'react';
import { useSubModal } from '../../hooks';
import { RestEntity } from '../_common';
import CourseListLink from '../Courses/CourseListLink';
import CourseView from '../Courses/CourseView';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import CourseCardLink from '../Courses/CourseCardLink';

const Main = props => {
  const { href } = props;
  const [selectedCourse, setSelectedCourse] = React.useState('');

  const { visible, showModal, hideModal } = useSubModal();
  return (
    <>
      <RestEntity href={href ?? '/courses'}>
        <RestEntity.List
          path={['courseList']}
          container={CourseListLink}
          component={subEntity => (
            <CourseCardLink
              key={subEntity._links.self.href}
              href={subEntity._links.self.href}
            >
              <Button
                onClick={() => {
                  setSelectedCourse(subEntity._links.self.href);
                  showModal();
                }}
              >
                See Course
              </Button>
            </CourseCardLink>
          )}
        />
        <RestEntity.Error>
          <div>There's been a problem!</div>
        </RestEntity.Error>
        <RestEntity.Loading>
          <div>Loading Courses...</div>
        </RestEntity.Loading>
      </RestEntity>
      <Modal visible={visible} onCancel={hideModal}>
        <CourseView href={selectedCourse} />
      </Modal>
    </>
  );
};

export default Main;
