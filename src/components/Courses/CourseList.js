import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CourseCard from './CourseCard';
import SearchPage from '../Search/SearchPage';

//ant d
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Button } from 'antd';

const CourseList = props => {
  const { course } = props;
  const { push } = useHistory();
  const { Header, Footer, Sider, Content } = Layout;
  const courseList = useSelector(state => state.courseReducer.courses_list);
  const user = useSelector(state => state.userReducer);
  const currentProgram = useSelector(
    state => state.programReducer.currentProgram
  );

  return (
    <Layout>
      <Header>
        <h1>{currentProgram.programname}</h1>
      </Header>
      <Layout>
        <Content>
          <h2>My Courses</h2>
          {user.role === 'ADMIN' && (
            <Link to="/add-course">
              <Button>Add Course</Button>
            </Link>
          )}
          {courseList.map(course => {
            return <CourseCard key={course.id} course={course} />;
          })}
        </Content>
        <Sider>
          {(user.role === 'ADMIN' || user.role === 'TEACHER') && <SearchPage />}
        </Sider>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default CourseList;
