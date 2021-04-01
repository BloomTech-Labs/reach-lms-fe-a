import React from 'react';
import { useForm, useRestfulFetch } from '../../hooks';
import '../../styles/Form.css';
import 'antd/dist/antd.css';
import { Modal, Button, Input, Select, Form } from 'antd';
import { client } from '../../utils/api';
const { TextArea } = Input;

const initialFormErrors = {
  coursename: '',
  coursecode: '',
  coursedescription: '',
};

function EditCourseForm(props) {
  const { data } = useRestfulFetch(props.href);
  const { values, onChange, setValues } = useForm(data, initialFormErrors);
  const [form] = Form.useForm();

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

  function submitForm(values) {
    const editedCourse = {
      courseid: data.courseid,
      coursename: values.coursename,
      coursecode: values.coursecode,
      coursedescription: values.coursedescription,
    };

    client.patchCourse(editedCourse.courseid, editedCourse);
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
  }

  if (!data || !values) {
    return <div>Loading...</div>;
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Edit Course</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        onFinish={submitForm}
        form={form}
        initialValues={{
          coursename: data.coursename,
          coursecode: data.coursecode,
          coursedescription: data.coursedescription,
        }}
      >
        <Form.Item
          name="coursename"
          label="Course Name:"
          rules={[
            {
              min: 5,
              type: 'string',
              required: true,
              message: 'ⓧ Course name must be at least 5 characters.',
            },
          ]}
        >
          <Input
            id="coursename"
            name="coursename"
            value={values.coursename}
            onChange={changeValues}
          />
        </Form.Item>

        <Form.Item
          name="coursecode"
          label="Course Code:"
          rules={[
            {
              min: 5,
              type: 'string',
              required: true,
              message: 'ⓧ Course code must be at least 5 characters.',
            },
          ]}
        >
          <Input
            id="coursecode"
            name="coursecode"
            value={values.coursecode}
            onChange={changeValues}
          />
        </Form.Item>

        <Form.Item
          name="coursedescription"
          label="Course Description:"
          rules={[
            {
              min: 10,
              type: 'string',
              required: true,
              message: 'ⓧ Course description must be at least 10 characters.',
            },
          ]}
        >
          <TextArea
            // onKeyPress={handleKeyPress}
            showCount
            maxLength={250}
            id="coursedescription"
            name="coursedescription"
            value={values.coursedescription}
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
          onOk={form.submit}
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

export default EditCourseForm;
