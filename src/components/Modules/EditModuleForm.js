// REACT, HOOKS, UTILS
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormWithErrors } from '../../hooks';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { moduleActions } from '../../state/ducks';

import Navigation from '../Navigation';
import styled from 'styled-components';
import schema from '../../validation/ModuleSchema';

// css
import '../../styles/Form.css';
// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Layout from 'antd/lib/layout';
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
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

const initialFormErrors = {
  modulename: '',
  moduledescription: '',
  modulecontent: '',
};

export default function EditModuleForm() {
  const { editModule, status, error } = useSelector(
    state => state.moduleReducer
  );
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { values, errors, disabled, onChange, resetForm } = useFormWithErrors(
    schema,
    editModule,
    initialFormErrors,
    false
  );

  useEffect(() => {
    if (status === 'edit/success') {
      dispatch(moduleActions.editModuleAction(values));
      dispatch(moduleActions.currentModule(values));
      resetForm();
      push('/module-text');
    }
    if (status === 'edit/error') {
      console.log(error);
    }
  }, [status, dispatch, push, values, error, resetForm]);

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
    moduleActions.editModuleThunk(editModule.moduleid, newModule);
  }

  // this goes back to the module-text card, which is the third iteration that we are editing
  const goBack = () => {
    push('/module-text');
  };
  // html updated for FormItem values
  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <StyledContainer>
        <Content>
          <h1 className="edit-form-h1">Edit Module</h1>
          <Form
            {...layout}
            name="basic"
            onFinish={submitForm}
            initialValues={{
              modulename: editModule.modulename,
              moduledescription: editModule.moduledescription,
              modulecontent: editModule.modulecontent,
            }}
            className="form"
          >
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
                rows={4}
              />
              <div style={{ color: 'red' }}>
                {errors.moduledescription ? `${errors.moduledescription}` : ''}
              </div>
            </FormItem>

            <FormItem label="Module Content:" name="modulecontent">
              <Input
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
