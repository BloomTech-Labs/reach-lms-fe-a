import React from 'react';
import { Form, Input, Select } from 'antd';
import Styled from './AddNewUserForm.styles';
import schema from '../../validation/NewUserSchema';
import { useFormWithErrors } from '../../hooks';
import { client } from '../../utils/api';

const initValues = {
  email: '',
  username: '',
  firstname: '',
  lastname: '',
  role: '',
};

const AddNewUserForm = props => {
  const { values, errors, disabled, onChange, resetValues } = useFormWithErrors(
    schema,
    initValues
  );

  const changeValues = evt => {
    const { name, value } = evt.target;
    onChange(name, value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    client.postNewUser(values);
    resetValues();
  };

  return (
    <>
      <h2>Create a User!</h2>
      <Form
        name="Create User"
        layout="vertical"
        size="large"
        onFinish={onSubmit}
      >
        <Form.Item label="User Name" name="username" validateStatus>
          <Input />
          <Styled.Error>{errors.username}</Styled.Error>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input />
          <Styled.Error>{errors.email}</Styled.Error>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNewUserForm;
