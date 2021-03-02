import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { currentModule } from '../../state/actions/moduleActions';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import {
  addStudent,
  addTeacher,
  editCourseAction,
  deleteStudent,
  deleteTeacher,
} from '../../state/actions/courseActions';
import Navigation from '../Navigation';

// material ui
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//ant d
import { Layout } from 'antd';
import { Menu } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
const { SubMenu } = Menu;
//ant Design
const { Header, Footer, Content } = Layout;

// styled components
const StyledMenuRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
`;

const HeaderDiv = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin: 5% 0;
`;

const StyledForm = styled(Form)`
  display: flex;
  align-content: flex-end;
  margin-left: 1%;
`;

const StyledSubmit = styled.div`
  margin-left: 2%;
  padding-top: 5%;
`;

const StyledFormItem = styled(FormItem)`
  padding-top: 5%;
  margin-bottom: 0;
`;

const ModuleList = props => {
  const { authService } = useOktaAuth();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const modules = useSelector(state => state.moduleReducer.modules_list);
  const currentCourse = useSelector(state => state.courseReducer.currentCourse);
  const user = useSelector(state => state.userReducer);
  const [newStudent, setNewStudent] = useState({ studentname: '' });
  const [newTeacher, setNewTeacher] = useState({ teachername: '' });

  const changeStudentValues = e => {
    console.log(e.target);
    const { name, value } = e.target;
    const valueToUse = value;
    setNewStudent({ ...newStudent, [e.target.name]: valueToUse });
  };

  const changeTeacherValues = e => {
    const { name, value } = e.target;
    const valueToUse = value;
    setNewTeacher({ ...newTeacher, [e.target.name]: valueToUse });
  };

  const handleClick = e => {
    console.log('click ', e);
    const moduleClicked = modules.filter(module => {
      return module.moduleid == e.key;
    })[0];
    console.log(moduleClicked);
    dispatch(currentModule(moduleClicked));
    push('/module-text');
  };

  function addStudentHandler(e) {
    e.preventDefault();
    console.log(currentCourse);
    console.log(newStudent);
    axiosWithAuth()
      .post(
        `https://reach-team-a-be.herokuapp.com/students/${currentCourse.courseid}`,
        newStudent
      )
      .then(res => {
        console.log(res);
        const addedStudent = {
          student: {
            studentid: res.data.studentid,
            studentname: res.data.studentname,
          },
        };
        dispatch(addStudent(addedStudent));
        const updatedCourse = currentCourse;
        updatedCourse.students.push(addedStudent);
        dispatch(editCourseAction(updatedCourse));
        setNewStudent('');
      })
      .catch(err => {
        console.log(err);
        alert(`Student ${newStudent.studentname} not found`);
      });
  }

  function addTeacherHandler(e) {
    e.preventDefault();
    console.log(currentCourse);
    console.log(newTeacher);
    axiosWithAuth()
      .post(
        `https://reach-team-a-be.herokuapp.com/teachers/${currentCourse.courseid}`,
        newTeacher
      )
      .then(res => {
        console.log(res);
        const addedTeacher = {
          teacher: {
            teacherid: res.data.teacherid,
            teachername: res.data.teachername,
          },
        };
        dispatch(addTeacher(addedTeacher));
        // const updatedCourse = currentCourse;
        // updatedCourse.teachers.push(addedTeacher);
        // dispatch(editCourseAction(updatedCourse));
        setNewTeacher('');
      })
      .catch(err => {
        console.log(err);
        alert(`Teacher ${newTeacher.teachername} not found`);
      });
  }

  const deleteStudentHandler = studentId => {
    console.log(studentId);
    console.log(currentCourse.courseid);
    axiosWithAuth()
      .delete(
        `https://reach-team-a-be.herokuapp.com/students/${currentCourse.courseid}/${studentId}`
      )
      .then(res => {
        console.log(res);
        dispatch(deleteStudent(studentId));
      })
      .then(err => {
        dispatch(editCourseAction(currentCourse));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteTeacherHandler = teacherId => {
    console.log(teacherId);
    console.log(currentCourse.courseid);
    axiosWithAuth()
      .delete(
        `https://reach-team-a-be.herokuapp.com/teachers/${currentCourse.courseid}/${teacherId}`
      )
      .then(res => {
        console.log(res);
        dispatch(
          deleteTeacher({
            teacherid: teacherId,
            courseid: currentCourse.courseid,
          })
        );
      })
      // .then(res => {
      //   dispatch(editCourseAction(currentCourse));
      // })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <Header>
        <Navigation authService={authService} />
      </Header>
      <Content>
        <StyledContainer>
          <HeaderDiv>
            <h1>{currentCourse.coursename}</h1>
            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
              <Link to="/add-module">
                <Button size="large" style={{ background: '#01fe87' }}>
                  Add Module
                </Button>
              </Link>
            )}
          </HeaderDiv>
          <div>
            <Menu
              onClick={handleClick}
              style={{ width: '80%' }}
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <SubMenu key="sub1" title="Modules">
                {modules.map(module => {
                  return (
                    <Menu.Item key={module.moduleid}>
                      {module.modulename}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            </Menu>
          </div>
          {/* {ADD TEACHER FORM and TEACHER LIST} */}
          <div>
            {user.role === 'ADMIN' && (
              <StyledForm>
                <StyledFormItem
                  htmlFor="teachername"
                  label="Add Teacher:"
                  validateStatus
                >
                  <Input
                    id="teachername"
                    name="teachername"
                    value={newTeacher.teachername}
                    onChange={changeTeacherValues}
                  />
                </StyledFormItem>
                <StyledSubmit>
                  <Button
                    onClick={addTeacherHandler}
                    type="primary"
                    className="button"
                  >
                    Submit
                  </Button>
                </StyledSubmit>
              </StyledForm>
            )}
            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
              <div>
                <Menu
                  // onClick={handleClick}
                  style={{ width: '80%' }}
                  // defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub3']}
                  mode="inline"
                >
                  <SubMenu key="sub3" title="Teachers">
                    {currentCourse.teachers.map((teacher, index) => {
                      return (
                        <StyledMenuRow>
                          <Menu.Item
                            key={teacher.teacher.teacherid}
                            style={{ marginTop: '2.5%' }}
                          >
                            {teacher.teacher.teachername}
                          </Menu.Item>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                deleteTeacherHandler(teacher.teacher.teacherid);
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </Tooltip>
                        </StyledMenuRow>
                      );
                    })}
                  </SubMenu>
                </Menu>
              </div>
            )}
          </div>
          {/* {ADD STUDENT form and STUDENT LIST} */}
          <div>
            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
              <div>
                <StyledForm>
                  <StyledFormItem
                    htmlFor="studentname"
                    label="Add Student:"
                    validateStatus
                  >
                    <Input
                      id="studentname"
                      name="studentname"
                      value={newStudent.studentname}
                      onChange={changeStudentValues}
                    />
                  </StyledFormItem>
                  <StyledSubmit>
                    <Button
                      onClick={addStudentHandler}
                      type="primary"
                      className="button"
                    >
                      Submit
                    </Button>
                  </StyledSubmit>
                </StyledForm>
              </div>
            )}
            {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
              <div>
                <Menu
                  // onClick={handleClick}
                  style={{ width: '80%' }}
                  // defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub2']}
                  mode="inline"
                >
                  <SubMenu key="sub2" title="Students">
                    {currentCourse.students.map(student => {
                      return (
                        <StyledMenuRow>
                          <Menu.Item
                            key={student.student.studentid}
                            style={{ marginTop: '2.5%' }}
                          >
                            {student.student.studentname}
                          </Menu.Item>
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() =>
                                deleteStudentHandler(student.student.studentid)
                              }
                            >
                              <DeleteIcon></DeleteIcon>
                            </IconButton>
                          </Tooltip>
                        </StyledMenuRow>
                      );
                    })}
                  </SubMenu>
                </Menu>
              </div>
            )}
          </div>
        </StyledContainer>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default ModuleList;
