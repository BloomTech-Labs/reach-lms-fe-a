import React from 'react';
import { useForm, useRestfulFetch } from '../../hooks';
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

  const { values, onChange, resetValues, setValues } = useForm(
    data,
    initialFormErrors
  );

  React.useEffect(() => {
    if (data) {
      setValues(prevValues => ({ ...prevValues, ...data }));
    }
  }, [data, values, setValues]);

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
            rows={4}
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
            rows={4}
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
          onOk={submitForm}
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

export default EditModuleForm;
