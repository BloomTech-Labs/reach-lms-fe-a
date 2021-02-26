import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModuleCard from './ModuleCard';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
              {/* <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item> */}
            </SubMenu>
          </Menu>
          {/* <div>Modules</div>
        <div>
          {modules.map(module => {
            return <ul>{module.modulename}</ul>
          })}
        </div> */}
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default ModuleList;
