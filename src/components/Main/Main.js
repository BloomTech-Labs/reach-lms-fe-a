import React from 'react';
import { useSubModal, useUserRole } from '../../hooks';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { GhostLink } from '../common';
import { ADMIN_LANDING } from '../../routes';
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
import Styled from './Main.styles';

const Main = props => {
  const { href, programId } = props;
  const { userIsAdmin } = useUserRole();
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
      <div>{programId && programInfo}</div>

      <h2>My Courses</h2>

      {userIsAdmin() && (
        <Button
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
            <ModuleList
              href={courseEntity._links.modules.href}
              mappedChild={moduleEntity => (
                <ModuleSingleton
                  key={moduleEntity._links.self.href}
                  href={moduleEntity._links.self.href}
                >
                  <Button
                    onClick={() => {
                      setSelectedModule(moduleEntity._links.self.href);
                      moduleEdit.showModal();
                    }}
                  >
                    Edit Module
                  </Button>
                </ModuleSingleton>
              )}
            />
            <Button
              onClick={() => {
                setSelectedCourse(courseEntity._links.self.href);
                courseEdit.showModal();
              }}
            >
              Edit Course
            </Button>
            <Button
              onClick={() => {
                setCourseId(courseEntity.courseid);
                moduleAdd.showModal();
              }}
            >
              Add a Module!
            </Button>
            <Button
              onClick={() => {
                setSelectedCourse(courseEntity._links.self.href);
                manageStudentTeacher.showModal();
              }}
            >
              Manage Users
            </Button>
          </CourseSingleton>
        )}
      />
      <AddCourseForm
        isWrapped={true}
        visible={courseAdd.visible}
        hideModal={courseAdd.hideModal}
        programId={programId}
        onSubmit={courseAdd.hideModal}
      />
      {/* Edit Course Model */}
      <Modal
        title="Edit Course"
        width="90vw"
        visible={courseEdit.visible}
        onCancel={courseEdit.hideModal}
      >
        <EditCourseForm href={selectedCourse} />
      </Modal>
      <Modal
        title="Add new Module"
        width="90vw"
        visible={moduleAdd.visible}
        onCancel={moduleAdd.hideModal}
      >
        <AddModuleForm href={selectedCourse} courseId={courseId} />
      </Modal>
      <Modal
        title="Edit Module"
        width="90vw"
        visible={moduleEdit.visible}
        onCancel={moduleEdit.hideModal}
      >
        <EditModuleForm href={selectedModule} />
      </Modal>
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
