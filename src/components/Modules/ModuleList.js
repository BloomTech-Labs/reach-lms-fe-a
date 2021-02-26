import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModuleCard from './ModuleCard';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { currentModule } from '../../state/actions/moduleActions';
//ant d
import { Layout } from 'antd';
import { Menu } from 'antd';
const { SubMenu } = Menu;

//ant Design
const { Header, Footer, Content } = Layout;

const ModuleList = props => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const modules = useSelector(state => state.moduleReducer.modules_list);
  const currentCourse = useSelector(state => state.courseReducer.currentCourse);

  const handleClick = e => {
    console.log('click ', e);
    const moduleClicked = modules.filter(module => {
      return module.moduleid == e.key;
    })[0];
    console.log(moduleClicked);
    dispatch(currentModule(moduleClicked));
    push('/module-text');
  };

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
          {/* <form>
        <input></input>
          <button onClick={addStudentHandler}>Add Student</button>
        </form> */}

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
