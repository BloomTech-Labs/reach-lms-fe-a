import React from 'react';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import { client } from '../../utils/api';
import schema from '../../validation/EditUserSchema';
import 'antd/dist/antd.css';
import { Form, Select } from 'antd';

{
  /*ant design imports*/
}

//check about form errors with dropdown only

const EditUserForm = props => {
  const { data } = useRestfulFetch(props.href);
  const { values, errors, disabled, onChange, setValues } = useFormWithErrors(
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
    const { role } = e.target;
    const valueToUse = role === 'select' ? Select : valueToUse;
    onChange(role, valueToUse);

    function submitForm(e) {
      e.preventDefault();

      const editedUser = {
        userid: data.userid,
        userrole: values.user.role,
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
            userrole: data.user.role,
          }}
        >
          <Form.Item label="User Roles">
            <Select value={values.user.role} onChange={changeValues}>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
              <Select.Option value="student">Student</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </>
    );
  };
};

export default EditUserForm;
