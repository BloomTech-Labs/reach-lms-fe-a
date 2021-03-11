import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import schema from '../../validation/ModuleSchema';
import { moduleActions } from '../../state/ducks';
import styled from 'styled-components';

// css
import '../../styles/Form.css';

// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Layout from 'antd/lib/layout';
import { useFormWithErrors } from '../../hooks';
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

export default function AddModule() {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { values, errors, disabled, onChange, resetValues } = useFormWithErrors(
    schema,
    initialValues
  );

  const courseid = useSelector(
    state => state.courseReducer.currentCourse.courseid
  );
  const { status, error } = useSelector(state => state.moduleReducer);

  const changeValues = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  useEffect(() => {
    if (status === 'add/success') {
      resetValues();
      push('/modules');
    }
    if (status === 'add/error') {
      // we may want to display an error message to user
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(moduleActions.addModuleThunk(courseid, values));
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
