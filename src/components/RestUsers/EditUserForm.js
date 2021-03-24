import React from 'react';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import { client } from '../../utils/api';
import schema from '../../validation/EditUserSchema';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Select, Table, Space } from 'antd';
import { CourseEnrollmentCheckbox } from '../common';

const columns = [
  {
    title: 'Course Code',
    dataIndex: 'coursecode',
    filters: [
      {
        text: 'labs',
        value: 'labs',
      },
      {
        text: 'cs',
        value: 'cs',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Course Name',
    dataIndex: 'coursename',
    sorter: (a, b) => a.characCodeAt(0) - b.charCodeAt(0),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
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
    console.log({data});
    console.log({courses})
    console.log(props.courses)
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
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
        {courses?.enrolled.map(course => (
          <Form.Item>
            <CourseEnrollmentCheckbox value={true} course={course} />
          </Form.Item>
        ))}
        {courses?.available.map(course => (
          <Form.Item>
            <CourseEnrollmentCheckbox value={false} course={course} />
          </Form.Item>
        ))}
      </Form>
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
