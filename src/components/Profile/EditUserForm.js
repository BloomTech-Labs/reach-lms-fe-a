import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navigation from '../Navigation';
import schema from '../../validation/ProfileSchema';
import { userActions } from '../../state/ducks';
import { useFormWithErrors, useUserRole } from '../../hooks';

// STYLING
import styled from 'styled-components';
// css
import '../../styles/Form.css';

// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Layout } from 'antd';
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

const initialUser = user => ({
  userid: user.userid,
  firstname: user.firstname,
  lastname: user.lastname,
  phonenumber: user.phonenumber,
  email: user.email,
  role: user.role,
});

const initialFormErrors = {
  firstname: '',
  lastname: '',
  phonenumber: '',
  email: '',
};

export default function EditUserForm() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  useUserRole();
  const { user, status, error } = useSelector(state => state.userReducer);
  const { values, errors, disabled, onChange, resetValues } = useFormWithErrors(
    schema,
    initialUser(user),
    initialFormErrors,
    false
  );

  const changeValues = e => {
    const { name, value, type, select } = e.target;
    const valueToUse = type === 'select' ? select : value;
    onChange(name, valueToUse);
  };

  useEffect(() => {
    if (status === 'edit/error') {
      console.error(error);
    }
    if (status === 'edit/success') {
      push('/profile');
      resetValues();
    }
  }, [status, error, push, resetValues]);

  function editUserSubmit(e) {
    e.preventDefault();
    const editedUser = { ...values, userid: user.userid };
    dispatch(userActions.editUserThunk(editedUser));
  }

  const goBack = () => {
    push('/profile');
  };

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <StyledContainer>
        <Content>
          <h1 className="edit-form-h1">Edit User</h1>
          <Form
            {...layout}
            name="basic"
            onFinish={editUserSubmit}
            className="form"
          >
            <FormItem htmlFor="firstname" label="First Name:">
              <Input
                id="firstname"
                name="firstname"
                value={values.firstname}
                onChange={changeValues}
              />
              <div style={{ color: 'red' }}>
                {errors.firstname ? `${errors.firstname}` : ''}
              </div>
            </FormItem>
            <FormItem htmlFor="lastname" label="Last Name:">
              <Input
                id="lastname"
                name="lastname"
                value={values.lastname}
                onChange={changeValues}
              />
              <div style={{ color: 'red' }}>
                {errors.lastname ? `${errors.lastname}` : ''}
              </div>
            </FormItem>
            <FormItem htmlFor="email" label="Email:" name="email">
              <Input
                id="email"
                name="email"
                value={values.email}
                onChange={changeValues}
              />
              <div style={{ color: 'red' }}>
                {errors.email ? `${errors.email}` : ''}
              </div>
            </FormItem>
            <FormItem htmlFor="phonenumber" label="Phone Number:">
              <Input
                id="phonenumber"
                name="phonenumber"
                value={values.phonenumber}
                onChange={changeValues}
              />
              <div style={{ color: 'red' }}>
                {errors.phonenumber ? `${errors.phonenumber}` : ''}
              </div>
            </FormItem>
            <div className="button-container">
              <Button onClick={goBack} type="secondary" className="button">
                Cancel
              </Button>
              <Button
                onClick={editUserSubmit}
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
