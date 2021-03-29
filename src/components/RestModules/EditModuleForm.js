import React from 'react';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
import schema from '../../validation/ModuleSchema';
// ant design
import 'antd/dist/antd.css';
import { Modal, Button, Input, Form } from 'antd';
import { client } from '../../utils/api';
const { TextArea } = Input;

const initialFormErrors = {
  modulename: '',
  moduledescription: '',
  modulecontent: '',
};

function EditModuleForm(props) {
  const { data } = useRestfulFetch(props.href);

  const {
    values,
    errors,
    disabled,
    onChange,
    resetValues,
    setValues,
  } = useFormWithErrors(schema, data, initialFormErrors, false);

  React.useEffect(() => {
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
    console.log({ data }, 'editModuleForm');
  }, [data, setValues]);

  const changeValues = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  function submitForm(e) {
    e.preventDefault();
    const { modulename, moduledescription, modulecontent } = values;
    const newModule = {
      modulename,
      moduledescription,
      modulecontent,
    };

    client.patchModule(data.moduleid, newModule);
    resetValues();
  }

  if (!values) {
    return <div>Loading module data...</div>;
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Edit Module</h1>
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
            rows={4}
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
            rows={4}
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
          onCancel={props.hideModal}
          onOk={e => {
            if (disabled) {
              props.hideModal();
            } else {
              submitForm(e);
              props.hideModal();
            }
          }}
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

export default EditModuleForm;
