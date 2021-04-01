import React from 'react';
import { useForm, useRestfulFetch } from '../../hooks';
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
  const { values, onChange, resetValues, setValues } = useForm(
    data,
    initialFormValues
  );
  const [form] = Form.useForm();

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

  function editUserSubmit(values) {
    const editedUser = {
      userid: data.userid,
      firstname: values.firstname,
      lastname: values.lastname,
      phonenumber: values.phonenumber,
      email: values.email,
    };
    client.patchUser(editedUser.userid, editedUser);
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
    resetValues();
  }

  if (!data || !values) {
    return <div>Loading...</div>;
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Edit User</h1>
      <Form
        name="Edit Profile"
        onFinish={editUserSubmit}
        size="large"
        layout="vertical"
        form={form}
        initialValues={{
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phonenumber: data.phonenumber,
        }}
      >
        <Form.Item
          name="firstname"
          label="First Name:"
          rules={[
            {
              min: 2,
              type: 'string',
              message: 'ⓧ First name must be at least 2 characters.',
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
          name="lastname"
          label="Last Name:"
          rules={[
            {
              min: 2,
              type: 'string',
              message: 'ⓧ Last name must be at least 2 characters.',
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
          name="email"
          label="Email:"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'ⓧ An email address is required.',
            },
          ]}
        >
          <Input
            id="email"
            name="email"
            value={values.email}
            onChange={changeValues}
          />
        </Form.Item>
        <Form.Item
          htmlFor="phonenumber"
          label="Phone Number:"
          rules={[
            {
              min: 10,
              required: true,
              type: 'string',
              message: 'ⓧ Phone number must be at least 10 digits.',
            },
          ]}
        >
          <Input
            id="phonenumber"
            name="phonenumber"
            value={values.phonenumber}
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
            <Button onClick={editUserSubmit} type="primary" className="button">
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default EditSelfForm;
