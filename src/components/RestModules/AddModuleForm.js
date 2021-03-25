import React from 'react';
import schema from '../../validation/ModuleSchema';
import { client } from '../../utils/api';
// css
import '../../styles/Form.css';
// ant design
import 'antd/dist/antd.css';
import { Modal, Button, Input, Form } from 'antd';
import { useFormWithErrors } from '../../hooks';
const { TextArea } = Input;

const initialValues = {
  modulename: '',
  moduledescription: '',
  modulecontent: '',
};

function AddModuleForm(props) {
  const { values, errors, disabled, onChange, resetValues } = useFormWithErrors(
    schema,
    initialValues
  );

  const changeValues = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  function submitForm(e) {
    e.preventDefault();
    client.postModule(props.courseId, values);
    resetValues();
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Add Module</h1>
      <Form name="basic" layout="vertical" size="large" onFinish={submitForm}>
        <Form.Item label="Module Name:" name="modulename" validateStatus>
          <Input
            id="modulename"
            name="modulename"
            value={values.modulename}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.modulename ? `${errors.modulename}` : ''}
          </div>
        </Form.Item>

        <Form.Item label="Module Description:" name="moduledescription">
          <TextArea
            showCount
            maxLength={250}
            id="moduledescription"
            name="moduledescription"
            value={values.moduledescription}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.moduledescription ? `${errors.moduledescription}` : ''}
          </div>
        </Form.Item>

        <Form.Item label="Module Content:" name="modulecontent">
          <TextArea
            showCount
            maxLength={250}
            id="modulecontent"
            name="modulecontent"
            value={values.modulecontent}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.modulecontent ? `${errors.modulecontent}` : ''}
          </div>
        </Form.Item>
      </Form>
    </>
  );

  return (
    <>
      {props.isWrapped ? (
        <Modal
          visible={props.visible}
          onOk={e => {
            if (disabled) {
              props.hideModal();
            } else {
              submitForm(e);
              props.hideModal();
            }
          }}
          onCancel={props.hideModal}
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
}

export default AddModuleForm;
