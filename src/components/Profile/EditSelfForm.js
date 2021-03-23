import React from 'react';
import schema from '../../validation/ProfileSchema';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import { client } from '../../utils/api';

// Ant Design
import 'antd/dist/antd.css';
import { Modal, Button, Input, Form } from 'antd';

const initialFormValues = {
  firstname: '',
  lastname: '',
  phonenumber: '',
  email: '',
};

const EditSelfForm = props => {
  const { data } = useRestfulFetch('/users/getuserinfo');

  const {
    values,
    errors,
    disabled,
    onChange,
    resetValues,
    setValues,
  } = useFormWithErrors(schema, initialFormValues, initialFormValues, false);

  React.useEffect(() => {
    if (data) {
      setValues(prev => ({ ...prev, ...data }));
    }
  }, [data, setValues]);

  const changeValues = e => {
    const { name, value, type, select } = e.target;
    const valueToUse = type === 'select' ? select : value;
    onChange(name, valueToUse);
  };

  function editUserSubmit(e) {
    e.preventDefault();
    const editedUser = { ...values, userid: data.userid };
    client.patchUser(data.userid, editedUser);
    resetValues();
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Edit User</h1>
      <Form
        name="Edit Profile"
        onFinish={editUserSubmit}
        size="large"
        layout="vertical"
      >
        <Form.Item htmlFor="firstname" label="First Name:">
          <Input
            id="firstname"
            name="firstname"
            value={values.firstname}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>{errors.firstname ?? ''}</div>
        </Form.Item>
        <Form.Item htmlFor="lastname" label="Last Name:">
          <Input
            id="lastname"
            name="lastname"
            value={values.lastname}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>{errors.lastname ?? ''}</div>
        </Form.Item>
        <Form.Item htmlFor="email" label="Email:" name="email">
          <Input
            id="email"
            name="email"
            value={values.email}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>{errors.email ?? ''}</div>
        </Form.Item>
        <Form.Item htmlFor="phonenumber" label="Phone Number:">
          <Input
            id="phonenumber"
            name="phonenumber"
            value={values.phonenumber}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>{errors.phonenumber ?? ''}</div>
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
          onOk={editUserSubmit}
        >
          {innerForm}
        </Modal>
      ) : (
        <>
          {innerForm}
          <div className="button-container">
            <Button
              onClick={editUserSubmit}
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

export default EditSelfForm;
