import React from 'react';
import { useSubModal, useUserRole } from '../../hooks';
import 'antd/dist/antd.css';
import { Input, Modal, Collapse, Space, Button } from 'antd';
import { GhostLink } from '../common';
import { ADMIN_LANDING } from '../../routes';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/Main.css';
import { EditModuleForm, AddModuleForm, ModulesTable } from '../RestModules';
import { CourseList, AddCourseForm, EditCourseForm } from '../RestCourses';
import { ProgramSingleton } from '../RestPrograms';
import { StudentTeacherManagement } from '../RestUsers';
import { FileUploader } from '../FileUploader';
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

  const [searchedTerm, setSearchedTerm] = React.useState(undefined);
  const [searchValue, setSearchValue] = React.useState('');

  const searchBar = (
    <>
      <Input
        value={searchValue}
        onChange={evt => setSearchValue(evt.target.value)}
      />
      <Button onClick={() => setSearchedTerm(searchValue)}> Search!</Button>
    </>
  );

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
      <Styled.Header>
        <div>{programId && programInfo}</div>
        <h2>My Courses</h2>
        {user.userIsAdmin() && (
          <Popup
            content="Add A New Course"
            trigger={
              <AddIcon
                style={{ fontSize: 35 }}
                className="group1"
                onClick={() => {
                  courseAdd.showModal();
                }}
              />
            }
          />
        )}
        <Styled.SearchContainer>{searchBar}</Styled.SearchContainer>
      </Styled.Header>
      <CourseList
        href={
          href ??
          `/courses/relevant${searchedTerm ? `?query=${searchedTerm}` : ''}`
        }
        mappedChild={courseEntity => {
          return (
            <Collapse accordion className="course-card">
              <Collapse.Panel header={courseEntity.coursename}>
                <Styled.TopCourseCard>
                  <h4>
                    <strong>Course Code:</strong> {courseEntity.coursecode}
                  </h4>
                  <Styled.IconsDiv>
                    <Space>
                      <Popup
                        content="Add A New Module"
                        trigger={
                          <AddIcon
                            style={{ fontSize: 35 }}
                            key="add"
                            onClick={() => {
                              setCourseId(courseEntity.courseid);
                              moduleAdd.showModal();
                            }}
                          />
                        }
                      />
                      <Popup
                        content="Manage Users"
                        trigger={
                          <GroupAddIcon
                            style={{ fontSize: 35 }}
                            key="manage"
                            onClick={() => {
                              setSelectedCourse(courseEntity._links.self.href);
                              manageStudentTeacher.showModal();
                            }}
                          />
                        }
                      />
                      <Popup
                        content="Edit Course"
                        trigger={
                          <EditOutlined
                            style={{ fontSize: 32 }}
                            key="edit"
                            onClick={() => {
                              // e.preventDefault();
                              setSelectedCourse(courseEntity._links.self.href);
                              courseEdit.showModal();
                            }}
                          />
                        }
                      />
                      <Popup
                        content="Delete Course"
                        trigger={
                          <DeleteOutline
                            style={{ fontSize: 35 }}
                            key="delete"
                            onClick={e => {
                              e.preventDefault();
                              client.deleteCourse(courseEntity.courseid);
                            }}
                          />
                        }
                      />
                    </Space>
                  </Styled.IconsDiv>
                </Styled.TopCourseCard>
                <p>
                  <strong>Description:</strong> {courseEntity.coursedescription}
                </p>
                <FileUploader
                  url={`https://reach-team-a-be.herokuapp.com/upload/csv/course-student-roster/${courseEntity.courseid}`}
                />
                <ModulesTable
                  key={courseEntity._links.self.href}
                  href={courseEntity._links.modules.href}
                  setSelectedModule={setSelectedModule}
                  moduleEdit={moduleEdit}
                />
              </Collapse.Panel>
            </Collapse>
          );
        }}
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
