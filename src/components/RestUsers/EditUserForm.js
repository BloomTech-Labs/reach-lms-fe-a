import React from 'react';
import { useForm, useRestfulFetch } from '../../hooks';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Select, Table } from 'antd';

const columns = [
  {
    title: 'Course Code',
    dataIndex: 'coursecode',
  },
  {
    title: 'Course Name',
    dataIndex: 'coursename',
  },
];

const EditUserForm = props => {
  const { data } = useRestfulFetch(props.href);
  const { data: courses } = useRestfulFetch(props.courses);
  const [allCourses, setAllCourses] = React.useState([]);
  const [courseSet, setCourseSet] = React.useState([]);
  const { values, onChange, setValues } = useForm(data);

  React.useEffect(() => {
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
    if (courses) {
      setAllCourses(
        courses.enrolled
          .map(course => {
            return { ...course, key: course.courseid, enrolled: true };
          })
          .concat(
            courses.available.map(course => {
              return { ...course, key: course.courseid, enrolled: false };
            })
          )
      );
      setCourseSet(courses.enrolled.map(course => course.courseid));
    }
  }, [data, setValues, courses]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCourseSet(selectedRowKeys);
    },
    getCheckboxProps: data => ({
      name: data.name,
      value: data.key,
    }),
    selectedRowKeys: courseSet,
  };

  const changeValues = evt => {
    if (typeof evt == 'string') {
      onChange('role', evt);
      return;
    }
    const { name, value, checked, type } = evt.target;
    if (type === 'checkbox') {
      setCourseSet(prevState => prevState.add(checked));
    }
    onChange(name, value);
  };

  function submitForm(e) {
    e.preventDefault();
  }

  if (!props.visible) {
    return null;
  }

  if (!data || !values || !courses) {
    return <div>Loading...</div>;
  }

  const innerForm = (
    <>
      <h1 className="edit-user-role">Edit Existing User Role</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        onFinish={submitForm}
        initialValues={{
          userrole: data.role,
        }}
      >
        <Form.Item
          name="role"
          label="User Roles:"
          rules={[
            {
              required: true,
              type: 'string',
              message: 'ⓧ Role is required.',
            },
          ]}
        >
          <Select
            id="role"
            name="role"
            value={values.role}
            onChange={changeValues}
          >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="teacher">Teacher</Select.Option>
            <Select.Option value="student">Student</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Table
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={allCourses}
      />
    </>
  );

  return (
    <>
      {props.isWrapped ? (
        <Modal
          visible={props.visible}
          onCancel={props.hideModal}
          onOk={submitForm}
        >
          {innerForm}
        </Modal>
      ) : (
        <>
          {innerForm}
          <div className="button-container">
            <Button onClick={submitForm} type="primary" className="button">
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default EditUserForm;
