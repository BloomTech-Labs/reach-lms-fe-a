import React from 'react';
import { useSelector } from 'react-redux';
import ModuleCard from './ModuleCard';
//ant d
import { Layout } from 'antd';

//ant Design
const { Header, Footer, Content } = Layout;

const ModuleList = props => {
  const modules = useSelector(state => state.moduleReducer.modules_list);

  return (
    <Layout>
      <Header>
        <h2>My Modules</h2>
      </Header>
      <Content>
        {modules.map(module => {
          return <ModuleCard key={module.moduleId} module={module} />;
        })}
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default ModuleList;
