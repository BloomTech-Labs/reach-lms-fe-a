import React from 'react';
import { useSubModal, useUserRole } from '../../hooks';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { GhostLink } from '../common';
import { ADMIN_LANDING } from '../../routes';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import '../../styles/Main.css';
import {
  EditModuleForm,
  AddModuleForm,
  ModuleList,
  ModuleSingleton,
} from '../RestModules';
import {
  CourseSingleton,
  CourseList,
  AddCourseForm,
  EditCourseForm,
} from '../RestCourses';
import { ProgramSingleton } from '../RestPrograms';
import { StudentTeacherManagement } from '../RestUsers';
import { client } from '../../utils/api';
import Styled from './Main.styles';

const Main = props => {
  const { href, programId } = props;
  const user = useUserRole();
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [selectedModule, setSelectedModule] = React.useState('');
  const courseAdd = useSubModal();
  const courseEdit = useSubModal();
  const moduleAdd = useSubModal();
  const moduleEdit = useSubModal();
  const manageStudentTeacher = useSubModal();
  const [courseId, setCourseId] = React.useState(0);

  const programInfo = (
    <GhostLink to={ADMIN_LANDING}>
      <ProgramSingleton
        href={`/programs/program/${programId}`}
        mappedChild={program => (
          <div>
            <h2>Program: {program.programname}</h2>
            <p>Program Description: {program.programname}</p>
          </div>
        )}
      />
    </GhostLink>
  );

  return (
    <Styled.Content>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans:wght@300&family=Roboto+Mono&display=swap');
      </style>
      <div>{programId && programInfo}</div>
      <h2>My Courses</h2>
      {user.userIsAdmin() && (
        <Button
          className="group1"
          onClick={() => {
            courseAdd.showModal();
          }}
        >
          Add Course
        </Button>
      )}
      <CourseList
        href={href ?? '/courses'}
        mappedChild={courseEntity => (
          <CourseSingleton
            key={courseEntity._links.self.href}
            href={courseEntity._links.self.href}
          >
            <AddIcon
              style={{ fontSize: 35 }}
              key="add"
              onClick={() => {
                setCourseId(courseEntity.courseid);
                moduleAdd.showModal();
              }}
            />
            <GroupAddIcon
              style={{ fontSize: 35 }}
              key="manage"
              onClick={() => {
                setSelectedCourse(courseEntity._links.self.href);
                manageStudentTeacher.showModal();
              }}
            />
            <EditOutlined
              style={{ fontSize: 32 }}
              key="edit"
              onClick={() => {
                // e.preventDefault();
                setSelectedCourse(courseEntity._links.self.href);
                courseEdit.showModal();
              }}
            />
            <DeleteOutline
              style={{ fontSize: 35 }}
              key="delete"
              onClick={e => {
                e.preventDefault();
                client.deleteCourse(courseEntity.courseid);
              }}
            />
            <ModuleList
              href={courseEntity._links.modules.href}
              mappedChild={moduleEntity => (
                <ModuleSingleton
                  key={moduleEntity._links.self.href}
                  href={moduleEntity._links.self.href}
                >
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setSelectedModule(moduleEntity._links.self.href);
                      moduleEdit.showModal();
                    }}
                  />
                  <DeleteOutline
                    key="delete"
                    onClick={e => {
                      e.preventDefault();
                      client.deleteModule(moduleEntity.moduleid);
                    }}
                  />
                </ModuleSingleton>
              )}
            />
          </CourseSingleton>
        )}
      />
      <AddCourseForm
        isWrapped={true}
        visible={courseAdd.visible}
        hideModal={courseAdd.hideModal}
        programId={programId}
        userId={user.userid}
        onSubmit={courseAdd.hideModal}
      />
      <EditCourseForm
        isWrapped={true}
        visible={courseEdit.visible}
        hideModal={courseEdit.hideModal}
        href={selectedCourse}
        onSubmit={courseEdit.hideModal}
      />
      <AddModuleForm
        isWrapped={true}
        visible={moduleAdd.visible}
        hideModal={moduleAdd.hideModal}
        courseId={courseId}
        onSubmit={moduleAdd.hideModal}
      />
      <EditModuleForm
        isWrapped={true}
        visible={moduleEdit.visible}
        hideModal={moduleEdit.hideModal}
        href={selectedModule}
        onSubmit={moduleEdit.hideModal}
      />
      <Modal
        title="Manage Users"
        width="90vw"
        visible={manageStudentTeacher.visible}
        onCancel={() => {
          setSelectedCourse('');
          manageStudentTeacher.hideModal();
        }}
        onOk={() => {
          setSelectedCourse('');
          manageStudentTeacher.hideModal();
        }}
      >
        <StudentTeacherManagement href={selectedCourse} />
      </Modal>
    </Styled.Content>
  );
};

export default Main;
