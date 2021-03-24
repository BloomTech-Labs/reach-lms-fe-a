import React from 'react';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import { client } from '../../utils/api';
import schema from '../../validation/EditUserSchema';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Select } from 'antd';

const EditUserForm = props => {
  const { data } = useRestfulFetch(props.href);
  const { values, disabled, onChange, setValues } = useFormWithErrors(
    schema,
    data,
    false
  );

  React.useEffect(() => {
    console.log(data);
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
  }, [data, setValues]);

  const changeValues = evt => {
    if (typeof evt == 'string') {
      onChange('role', evt);
      return;
    }
    const { name, value } = evt.target;
    onChange(name, value);
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
