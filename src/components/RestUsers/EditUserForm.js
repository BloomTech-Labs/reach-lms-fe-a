import React from 'react';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import { client } from '../../utils/api';
import schema from '../../validation/EditUserSchema';
import 'antd/dist/antd.css';
import { Button, Form, Select } from 'antd';

const EditUserForm = props => {
  const { data } = useRestfulFetch(props.href);
  const { values, disabled, onChange, setValues } = useFormWithErrors(
    schema,
    data,
    false
  );

  React.useEffect(() => {
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
  }, [data, setValues]);

  const changeValues = e => {
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    onChange(name, valueToUse);
  };

  function submitForm(e) {
    e.preventDefault();

    const editedUser = {
      userid: data.userid,
      userrole: values.role,
    };

    client.patchUser(editedUser.userid, editedUser);
  }

  if (!data || !values) {
    return <div>Loading...</div>;
  }

  return (
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
      </Form>
    </>
  );
};

export default EditUserForm;
