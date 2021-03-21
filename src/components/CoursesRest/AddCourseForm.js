import React from 'react';
import schema from '../../validation/CourseSchema';
import { useFormWithErrors } from '../../hooks';
import 'antd/dist/antd.css';
import { Button, Input, Select, Form } from 'antd';
import { client } from '../../utils/api';
const { TextArea } = Input;

const initialFormValues = {
  coursename: '',
  coursecode: '',
  coursedescription: '',
};

function AddCourseForm(props) {
  // const [programId, setProgramId] = React.useState(props.programId);
  // const { data: programs } = useRestfulFetch(`/programs/${props.userId}`);
  const { values, errors, disabled, onChange } = useFormWithErrors(
    schema,
    initialFormValues,
    initialFormValues,
    false
  );

  const changeValues = e => {
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    onChange(name, valueToUse);
  };

  function submitForm(e) {
    e.preventDefault();
    const { courseid, coursename, coursecode, coursedescription } = values;
    const newCourse = {
      courseid,
      coursename,
      coursecode,
      coursedescription,
    };
    // this programId is what will associate the new course with an existing program
    client.postCourse(props.programId, newCourse);
  }

  return (
    <>
      <h1 className="edit-form-h1">Add Course</h1>
      <Form name="basic" layout="vertical" size="large" onFinish={submitForm}>
        {/* 
        <Form.Item name="programSelected" label="Associated Program" rules={[{ required: true }]}>
          <Select
            name="program"
            placeholder="Select a Program"
            defaultValue={props.programId ? parseInt(props.programId) : undefined}
          >
            {programs?.map(programIn => (
              <Select.Option value={programIn.programid}>
                {programIn.programname}
              </Select.Option>
            ))}
          </Select>

        </Form.Item> */}
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
      </Form>
    </>
  );
}

export default AddCourseForm;
