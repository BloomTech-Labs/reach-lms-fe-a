import React from 'react';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import { client } from '../../utils/api';
import schema from '../../validation/EditUserSchema';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Select, Table, Space } from 'antd';
import { CourseEnrollmentCheckbox } from '../common';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  // getCheckboxProps: record => ({
  //   disabled: record.name === 'Disabled User',
  //   // Column configuration not to be checked
  //   name: record.name,
  // }),
};

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

const data = [
  {
    key: '1',
    coursename: 'Course 1',
    coursecode: 32,
  },
  {
    key: '2',
    coursename: 'Course 2',
    coursecode: 42,
  },
  {
    key: '3',
    coursename: 'Course 3',
    coursecode: 56,
  },
];

const EditUserForm = props => {
  const { data } = useRestfulFetch(props.href);
  const { data: courses } = useRestfulFetch(props.courses);
  const [courseSet, setCourseSet] = React.useState(new Set());
  const { values, disabled, onChange, setValues } = useFormWithErrors(
    schema,
    data,
    false
  );

  React.useEffect(() => {
    console.log({ data });
    console.log({ courses });
    console.log(props.courses);
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
    if (courses) {
      const newCourses = new Set();
      courses.enrolled.forEach(course => {});
    }
  }, [data, setValues, courses]);

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

    const editedUser = {
      userid: data.userid,
      userrole: values.role,
    };

    // client.patchUser(editedUser.userid, editedUser);
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
        <Form.Item htmlFor="role" label="User Roles:" validateStatus>
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
        {/* {courses?.enrolled.map(course => (
          <Form.Item>
            <CourseEnrollmentCheckbox value={true} course={course} />
          </Form.Item>
        ))}
        {courses?.available.map(course => (
          <Form.Item>
            <CourseEnrollmentCheckbox value={false} course={course} />
          </Form.Item>
        ))} */}
      </Form>
      <Table
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        columns={columns}
        dataSource={data}
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
            <Button
              onClick={submitForm}
              type="primary"
              disabled={disabled}
              className="button"
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default EditUserForm;
