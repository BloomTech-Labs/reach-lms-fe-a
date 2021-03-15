import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import schema from '../../validation/CourseSchema';
import { useFormWithErrors } from '../../hooks';
import { courseActions } from '../../state/ducks';
import { pathUtils } from '../../routes';
import styled from 'styled-components';

// css
import '../../styles/Form.css';
// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
const { TextArea } = Input;

//styled components
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  margin-left: 10%;
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  coursename: '',
  coursecode: '',
  coursedescription: '',
};

export default function AddCourse() {
  const { programId } = useParams();
  const BACK_PATH = pathUtils.makeViewAllCoursesPath(programId);
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { values, errors, disabled, onChange, resetValues } = useFormWithErrors(
    schema,
    initialValues
  );

  const currentProgramId = useSelector(
    state => state.programReducer.currentProgram?.programid
  );

  const { status, error } = useSelector(state => state.courseReducer);

  const changeValues = e => {
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    onChange(name, valueToUse);
  };

  useEffect(() => {
    if (status === 'post/fail') {
      // probably should show this error to the user
      console.log(error);
    }
    if (status === 'post/success') {
      resetValues();
      // push('/courses');
      push(BACK_PATH);
    }
  }, [status, error, resetValues, push, BACK_PATH]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(courseActions.addCourseThunk(currentProgramId, values));
  }

  const goBack = () => {
    // push('/courses');
    push(BACK_PATH);
  };

  return (
    <StyledContainer>
      <h1 className="edit-form-h1">Add Course</h1>
      <Form {...layout} name="basic" onFinish={submitForm} className="form">
        <FormItem htmlFor="coursename" label="Course Name:" validateStatus>
          <Input
            id="coursename"
            name="coursename"
            value={values.coursename}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.coursename ? `${errors.coursename}` : ''}
          </div>
        </FormItem>

        <FormItem htmlFor="coursecode" label="Course Code:">
          <Input
            id="coursecode"
            name="coursecode"
            value={values.coursecode}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.coursecode ? `${errors.coursecode}` : ''}
          </div>
        </FormItem>

        <FormItem htmlFor="coursedescription" label="Course Description:">
          <TextArea
            showCount
            maxLength={250}
            id="coursedescription"
            name="coursedescription"
            value={values.coursedescription}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.coursedescription ? `${errors.coursedescription}` : ''}
          </div>
        </FormItem>
        <div className="button-container">
          <Button onClick={goBack} type="secondary" className="button">
            Cancel
          </Button>
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
    </StyledContainer>
  );
}
