import React from 'react';
import { client } from '../../utils/api';
// css
import '../../styles/Form.css';
// ant design
import 'antd/dist/antd.css';
import { Modal, Button, Input, Form } from 'antd';
import { useForm } from '../../hooks';
const { TextArea } = Input;

const initialValues = {
  modulename: '',
  moduledescription: '',
  modulecontent: '',
};

function AddModuleForm(props) {
  const { values, onChange, resetValues } = useForm(initialValues);
  const [form] = Form.useForm();

  const changeValues = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  function submitForm(values) {
    client.postModule(props.courseId, values);
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
    resetValues();
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Add Module</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        onFinish={submitForm}
        form={form}
      >
        <Form.Item
          label="Module Name:"
          name="modulename"
          rules={[
            {
              min: 5,
              type: 'string',
              required: true,
              message: 'ⓧ Module name must be at least 5 characters.',
            },
          ]}
        >
          <Input
            id="modulename"
            name="modulename"
            value={values.modulename}
            onChange={changeValues}
          />
        </Form.Item>

        <Form.Item
          label="Module Description:"
          name="moduledescription"
          rules={[
            {
              min: 10,
              type: 'string',
              required: true,
              message: 'ⓧ Module description must be at least 10 characters.',
            },
          ]}
        >
          <TextArea
            showCount
            maxLength={250}
            id="moduledescription"
            name="moduledescription"
            value={values.moduledescription}
            onChange={changeValues}
          />
        </Form.Item>

        <Form.Item
          label="Module Content:"
          name="modulecontent"
          rules={[
            {
              min: 10,
              type: 'string',
              required: true,
              message: 'ⓧ Module content must be at least 10 characters.',
            },
          ]}
        >
          <TextArea
            showCount
            maxLength={250}
            id="modulecontent"
            name="modulecontent"
            value={values.modulecontent}
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
          onOk={form.submit}
          onCancel={props.hideModal}
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
}

export default AddModuleForm;
