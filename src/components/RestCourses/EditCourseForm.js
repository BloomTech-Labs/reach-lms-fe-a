import React from 'react';
import schema from '../../validation/CourseSchema';
import { useFormWithErrors, useRestfulFetch } from '../../hooks';
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
  const { values, errors, disabled, onChange, setValues } = useFormWithErrors(
    schema,
    data,
    initialFormErrors,
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
    const editedCourse = {
      courseid: data.courseid,
      coursename: values.coursename,
      coursecode: values.coursecode,
      coursedescription: values.coursedescription,
    };

    client.patchCourse(editedCourse.courseid, editedCourse);
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
        initialValues={{
          coursename: data.coursename,
          coursecode: data.coursecode,
          coursedescription: data.coursedescription,
        }}
      >
        <Form.Item htmlFor="coursename" label="Course Name:" validateStatus>
          <Input
            id="coursename"
            name="coursename"
            value={values.coursename}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.coursename ? `${errors.coursename}` : ''}
          </div>
        </Form.Item>

        <Form.Item htmlFor="coursecode" label="Course Code:">
          <Input
            id="coursecode"
            name="coursecode"
            value={values.coursecode}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.coursecode ? `${errors.coursecode}` : ''}
          </div>
        </Form.Item>

        <Form.Item htmlFor="coursedescription" label="Course Description:">
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
          <div style={{ color: 'red' }}>
            {errors.coursedescription ? `${errors.coursedescription}` : ''}
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
}

export default EditCourseForm;
