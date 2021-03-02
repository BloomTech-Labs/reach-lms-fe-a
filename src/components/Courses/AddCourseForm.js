import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import * as yup from 'yup';
import schema from '../../validation/CourseSchema';
import { addCourse } from '../../state/actions/courseActions';
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
import { Layout } from 'antd';
const { TextArea } = Input;
const { Header, Footer, Content } = Layout;

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

const initialFormErrors = {
  coursename: '',
  coursecode: '',
  coursedescription: '',
};

export default function AddCourse() {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const currentProgram = useSelector(
    state => state.programReducer.currentProgram
  );

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const changeValues = e => {
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    setFormErrors(name, valueToUse);
    setValues({ ...values, [e.target.name]: valueToUse });
  };

  useEffect(() => {
    schema.isValid(values).then(valid => setDisabled(!valid));
  }, [values]);

  function submitForm(e) {
    e.preventDefault();
    console.log(values);
    axiosWithAuth()
      .post(
        `https://reach-team-a-be.herokuapp.com/courses/${currentProgram.programid}/course`,
        values
      )
      .then(res => {
        console.log('Newly made course', res);
        dispatch(addCourse(res.data));
        setValues(initialValues);
        push('/courses');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const goBack = () => {
    push('/courses');
  };

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <StyledContainer>
        <Content>
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
        </Content>
      </StyledContainer>
      <Footer></Footer>
    </Layout>
  );
}
