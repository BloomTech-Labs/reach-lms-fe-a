import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import * as yup from 'yup';
import schema from '../../validation/ModuleSchema';
import { addModule } from '../../state/actions/moduleActions';
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
  modulename: '',
  moduledescription: '',
  modulecontent: '',
};

const initialFormErrors = {
  modulename: '',
  moduledescription: '',
  modulecontent: '',
};

export default function AddModule() {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const currentCourse = useSelector(state => state.courseReducer.currentCourse);

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
        `https://reach-team-a-be.herokuapp.com/modules/${currentCourse.courseid}/module`,
        values
      )
      .then(res => {
        console.log(res);
        dispatch(addModule(res.data));
        setValues(initialValues);
        push('/modules');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const goBack = () => {
    push('/modules');
  };

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <StyledContainer>
        <Content>
          <h1 className="edit-form-h1">Add Module</h1>
          <Form {...layout} name="basic" onFinish={submitForm} className="form">
            <FormItem label="Module Name:" name="modulename" validateStatus>
              <Input
                id="modulename"
                name="modulename"
                value={values.modulename}
                onChange={changeValues}
              />
              <div style={{ color: 'red' }}>
                {errors.modulename ? `${errors.modulename}` : ''}
              </div>
            </FormItem>

            <FormItem label="Module Description:" name="moduledescription">
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
            </FormItem>

            <FormItem label="Module Content:" name="modulecontent">
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
