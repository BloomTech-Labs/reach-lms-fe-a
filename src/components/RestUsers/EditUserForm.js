import React from 'react';
import { useForm, useRestfulFetch } from '../../hooks';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Select, Table } from 'antd';
import { client } from '../../utils/api';

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
  const { data: courses } = useRestfulFetch(`/courses/user/${props.courses}`);
  const [allCourses, setAllCourses] = React.useState([]);
  const [courseSet, setCourseSet] = React.useState([]);
  const { values, onChange, setValues } = useForm(data);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
    if (courses && courses.hasOwnProperty('courseList')) {
      setAllCourses(
        courses?.courseList.map(course => {
          return { ...course, key: course.courseid, enrolled: true };
        })
      );
      setCourseSet(courses.courseList.map(course => course.courseid));
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

  function submitForm(values) {
    const editedUser = {
      userid: data.userid,
      role: values.role,
    };
    client.patchUserNewRole(editedUser.userid, editedUser.role);
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
  }

  if (!props.visible) {
    return null;
  }

  if (!data || !values) {
    return <div>Loading...</div>;
  }

  const innerForm = (
    <>
      <h1 className="edit-user-role">Edit Existing User Role</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        form={form}
        onFinish={submitForm}
        initialValues={{
          role: data.role,
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
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="TEACHER">Teacher</Select.Option>
            <Select.Option value="STUDENT">Student</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      {allCourses ? (
        <Table
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          columns={columns}
          dataSource={allCourses}
        />
      ) : (
        <div>no courses</div>
      )}
    </>
  );

  return (
    <>
      {props.isWrapped ? (
        <Modal
          visible={props.visible}
          onCancel={props.hideModal}
          onOk={form.submit}
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
