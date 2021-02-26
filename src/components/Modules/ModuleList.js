import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModuleCard from './ModuleCard';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

//ant d
import { Layout } from 'antd';

//ant Design
const { Header, Footer, Content } = Layout;

const ModuleList = props => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const modules = useSelector(state => state.moduleReducer.modules_list);
  const currentCourse = useSelector(state => state.courseReducer.currentCourse);

  return (
    <Layout>
      <Header>
        {/* {header was blocking h1 and h2 so i moved them down. feel free to move back when working.} */}
      </Header>
      <Content>
        <h1>{currentCourse.coursename}</h1>
        <h2>My Modules</h2>
        <Link to="/add-module">
          <button>Add Course</button>
        </Link>
        {modules.map(module => {
          return <ModuleCard key={module.moduleid} module={module} />;
        })}
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default ModuleList;
