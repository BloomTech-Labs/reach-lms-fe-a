import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModuleCard from './ModuleCard';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { currentModule } from '../../state/actions/moduleActions';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { addStudent } from '../../state/actions/courseActions';

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

const ModuleList = props => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const modules = useSelector(state => state.moduleReducer.modules_list);
  const currentCourse = useSelector(state => state.courseReducer.currentCourse);
  const [newStudent, setNewStudent] = useState({
    studentname: '',
  });

  const changeValues = e => {
    const { name, value } = e.target;
    const valueToUse = value;
    setNewStudent({ ...newStudent, [e.target.name]: valueToUse });
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
      .put(
        `https://reach-team-a-be.herokuapp.com/students/${currentCourse.courseid}`,
        newStudent
      )
      .then(res => {
        console.log(res);
        dispatch(addStudent(res.data));
        setNewStudent('');
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(values);
    // axiosWithAuth()
    //   .post(
    //     `https://reach-team-a-be.herokuapp.com/courses/${currentProgram.programid}/course`,
    //     values
    //   )
    //   .then(res => {
    //     console.log('Newly made course', res);
    //     dispatch(addCourse(res.data));
    //     setValues(initialValues);
    //     push('/courses');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  return (
    <Layout>
      <Header>
        {/* {header was blocking h1 and h2 so i moved them down. feel free to move back when working.} */}
      </Header>
      <Content>
        <div>
          <h1>{currentCourse.coursename}</h1>
          <Link to="/add-module">
            <button>Add Module</button>
          </Link>
        </div>
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
        <div>
          <Form>
            <FormItem htmlFor="studentname" label="Add Student:" validateStatus>
              <Input
                id="studentname"
                name="studentname"
                value={newStudent.studentname}
                onChange={changeValues}
              />
            </FormItem>
            <Button
              onClick={addStudentHandler}
              type="primary"
              className="button"
            >
              Submit
            </Button>
          </Form>
        </div>
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
                  <Menu.Item key={student.studentid}>
                    {student.studentname}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default ModuleList;
