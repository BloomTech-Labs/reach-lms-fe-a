import React from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { useForm } from '../../hooks';
import { client } from '../../utils/api';

const initValues = {
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  roleType: '',
};

const AddNewUserForm = props => {
  const { values, onChange, resetValues } = useForm(initValues);
  const [form] = Form.useForm();

  const changeValues = evt => {
    if (typeof evt == 'string') {
      // this strange exists to handle the change-function for AntD's `Select` element
      onChange('roleType', evt);
      return;
    }
    const { name, value } = evt.target;
    onChange(name, value);
  };

  const onSubmit = values => {
    const { email, username, firstname, lastname, roleType } = values;
    const newUser = {
      email,
      username,
      firstname,
      lastname,
      roleType,
    };
    client.postNewUser(newUser);
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
    resetValues();
  };

  const innerForm = (
    <>
      <h2>Create a User!</h2>
      <Form
        name="Create User"
        layout="vertical"
        size="large"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="*Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'A valid email address is required.',
            },
          ]}
        >
          <Input
            name="email"
            id="email"
            value={values.email}
            onChange={changeValues}
          />
        </Form.Item>
        <Form.Item
          name="roleType"
          label="*Role"
          rules={[{ required: true, message: 'Role is required.' }]}
        >
          <Select value={values.roleType} onChange={changeValues}>
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="TEACHER">Teacher</Select.Option>
            <Select.Option value="STUDENT">Student</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            {
              type: 'string',
              message: 'First name must be written in letters.',
            },
          ]}
        >
          <Input
            id="firstname"
            name="firstname"
            value={values.firstname}
            onChange={changeValues}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              type: 'string',
              message: 'Last name must be written in letters.',
            },
          ]}
        >
          <Input
            id="lastname"
            name="lastname"
            value={values.lastname}
            onChange={changeValues}
          />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              type: 'string',
              message:
                'A valid username can only contain letters (a-z) and numbers(0-9).',
            },
          ]}
        >
          <Input
            id="username"
            name="username"
            value={values.username}
            onChange={changeValues}
          />
        </Form.Item>
      </Form>
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
            <Button onClick={onSubmit} type="primary" className="button">
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default AddNewUserForm;
