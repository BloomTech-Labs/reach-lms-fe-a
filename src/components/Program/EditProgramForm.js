// REACT, HOOKS,
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormWithErrors } from '../../hooks';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { programActions } from '../../state/ducks';

// MISC
import schema from '../../validation/ProgramSchema';
import styled from 'styled-components';
import Navigation from '../Navigation';

// CSS
import '../../styles/Form.css';

// ANT DESIGN
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Layout from 'antd/lib/layout';
const { Option } = Select;
const { TextArea } = Input;
const { Header, Footer, Content } = Layout;

// STYLED COMPONENTS
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
  programname: '',
  programtype: '',
  programdescription: '',
};

const getInitialFormValues = program => {
  const { programname, programtype, programdescription } = program;
  return { programname, programtype, programdescription };
};

export default function EditProgramAntDesign() {
  const { push } = useHistory();

  const dispatch = useDispatch();
  const { editProgram: programToEdit, status, error } = useSelector(
    state => state.programReducer
  );

  const {
    values: input,
    errors,
    disabled,
    onChange,
    resetValues,
  } = useFormWithErrors(
    schema,
    getInitialFormValues(programToEdit),
    initialFormErrors,
    false
  );

  const changeValues = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  const changeSelect = value => {
    onChange('programtype', value);
  };

  useEffect(() => {
    if (status === 'edit/success') {
      resetValues();
      push('/');
    }
    if (status === 'edit/error') {
      // we may want to display an error to the user instead of console.logging
      console.log(error);
    }
  }, [status, error, push, resetValues]);

  function submitEditProgram(e) {
    e.preventDefault();
    console.log({ programToEdit });
    dispatch(programActions.editProgramThunk(programToEdit.programid, input));
  }

  const goBack = () => {
    push('/');
  };

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <StyledContainer>
        <Content>
          <h1 className="edit-form-h1">Edit Program</h1>
          <Form
            {...layout}
            name="basic"
            onFinish={submitEditProgram}
            initialValues={{
              programname: programToEdit.programname,
              programtype: programToEdit.programtype,
              programdescription: programToEdit.programdescription,
            }}
            className="form"
          >
            <FormItem htmlFor="programname" label="Program Name:">
              <Input
                id="programname"
                name="programname"
                value={input.programname}
                onChange={changeValues}
              />
              <div style={{ color: 'red' }}>
                {errors.programname ? `${errors.programname}` : ''}
              </div>
            </FormItem>

            <FormItem htmlFor="programtype" label="Program Type:">
              <Select
                id="programtype"
                name="programtype"
                value={input.programtype}
                placeholder="Select a program type"
                onChange={changeSelect}
              >
                <Option value="">- Select A Type -</Option>
                <Option value="1st Grade">-1st Grade-</Option>
                <Option value="2nd Grade">-2nd Grade-</Option>
                <Option value="3rd Grade">-3rd Grade-</Option>
                <Option value="4th Grade">-4th Grade-</Option>
                <Option value="5th Grade">-5th Grade-</Option>
                <Option value="6th Grade">-6th Grade-</Option>
                <Option value="7th Grade">-7th Grade-</Option>
                <Option value="8th Grade">-8th Grade-</Option>
                <Option value="9th Grade">-9th Grade-</Option>
                <Option value="10th Grade">-10th Grade-</Option>
                <Option value="11th Grade">-11th Grade-</Option>
                <Option value="12th Grade">-12th Grade-</Option>
                <Option value="higher">-Higher-</Option>
                <Option value="training">-Training-</Option>
                <Option value="other">-Other-</Option>
              </Select>
              <div style={{ color: 'red' }}>
                {errors.programtype ? `${errors.programtype}` : ''}
              </div>
            </FormItem>
            <FormItem htmlFor="programdescription" label="Program Description:">
              <TextArea
                showCount
                maxLength={1000}
                id="programdescription"
                name="programdescription"
                value={input.programdescription}
                onChange={changeValues}
                rows={4}
              />
              <div style={{ color: 'red' }}>
                {errors.programdescription
                  ? `${errors.programdescription}`
                  : ''}
              </div>
            </FormItem>
            <div className="button-container">
              <Button onClick={goBack} type="secondary" className="button">
                Cancel
              </Button>
              <Button
                onClick={submitEditProgram}
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
