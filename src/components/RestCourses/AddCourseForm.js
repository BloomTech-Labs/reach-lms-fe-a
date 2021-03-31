import React from 'react';
import { useForm, useRestfulFetch } from '../../hooks';
import 'antd/dist/antd.css';
import { Modal, Button, Input, Select, Form } from 'antd';
import { client } from '../../utils/api';

const { TextArea } = Input;

const initialFormValues = {
  coursename: '',
  coursecode: '',
  coursedescription: '',
};

function AddCourseForm(props) {
  const [programId, setProgramId] = React.useState(props.programId);
  const { data: programs } = useRestfulFetch(`/programs/${props.userId}`);
  const { values, onChange } = useForm(initialFormValues);
  const [form] = Form.useForm();

  const changeValues = e => {
    if (typeof e == 'number') {
      setProgramId(e);
      return;
    }
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    onChange(name, valueToUse);
  };

  function submitForm(values) {
    const { courseid, coursename, coursecode, coursedescription } = values;
    const newCourse = {
      courseid,
      coursename,
      coursecode,
      coursedescription,
    };
    // this programId is what will associate the new course with an existing program
    client.postCourse(programId, newCourse);
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
  }

  const innerForm = (
    <>
      <h1 className="edit-form-h1">Add Course</h1>
      <Form
        name="basic"
        layout="vertical"
        size="large"
        onFinish={submitForm}
        form={form}
      >
        {!props.programId && (
          <Form.Item
            name="programSelected"
            label="Associated Program"
            rules={[{ required: true }]}
          >
            <Select
              name="program"
              placeholder="Select a Program"
              onChange={changeValues}
              defaultValue={
                props.programId ? parseInt(props.programId) : undefined
              }
            >
              {programs?.programList.map(programIn => (
                <Select.Option
                  key={Math.random(100)}
                  value={programIn.programid}
                >
                  {programIn.programname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
        {props.children}
      </Form>
    </>
  );

  return (
    <>
      {props.isWrapped ? (
        <Modal
          key={props.key + 'modal'}
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

export default AddCourseForm;
