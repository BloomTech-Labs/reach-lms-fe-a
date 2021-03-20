import React from 'react';
import { useSubModal } from '../../hooks';
import { Collection } from '../_common';
import CourseListLink from '../Courses/CourseListLink';
import CourseView from '../Courses/CourseView';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import CourseCardLink from '../Courses/CourseCardLink';

const Main = props => {
  const { visible, showModal, hideModal } = useSubModal();
  return (
    <>
      <Collection href="/courses">
        <Collection.List
          path={['courseList']}
          container={CourseListLink}
          component={subEntity => (
            <CourseCardLink
              key={subEntity._links.self.href}
              href={subEntity._links.self.href}
            >
              <Button onClick={showModal}>See Course</Button>
            </CourseCardLink>
          )}
        ></Collection.List>
      </Collection>
      <Modal visible={visible} onCancel={hideModal}>
        <CourseView />
      </Modal>
    </>
  );
};

export default Main;
