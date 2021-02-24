import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import schema from '../../validation/ProfileSchema';
import * as yup from 'yup';
import { editUser } from '../../state/actions/userActions';

// css
import '../../styles/Form.css';

// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

const initialFormErrors = {
  firstname: '',
  lastname: '',
  phonenumber: '',
  email: '',
};

export default function EditUserForm() {
  // const userToEdit = useSelector(state => state.userReducer.edit_user);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector(state => state.userReducer);
  const [disabled, setDisabled] = useState(false);
  const [input, setInput] = useState({
    userid: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    phonenumber: user.phonenumber,
    email: user.email,
    role: user.role,
  });
  const [errors, setErrors] = useState(initialFormErrors);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const changeValues = e => {
    const { name, value, type, select } = e.target;
    const valueToUse = type === 'select' ? select : value;
    setFormErrors(name, valueToUse);
    setInput({ ...input, [e.target.name]: valueToUse });
  };

  useEffect(() => {
    schema.isValid(input).then(valid => setDisabled(!valid));
  }, [input]);

  function editUserSubmit(e) {
    e.preventDefault();
    axiosWithAuth()
      .patch(
        `https://reach-team-a-be.herokuapp.com/users/user/${user.userid}`,
        input
      )
      .then(res => {
        console.log('Successful Patch: ', res);
      })
      .catch(err => console.log(err));
    dispatch(editUser(input));
    push('/profile');
  }

  const goBack = () => {
    push('/profile');
  };

  return (
    <div className="container">
      <h1 className="edit-form-h1">Edit User</h1>
      <Form
        {...layout}
        name="basic"
        onFinish={editUserSubmit}
        initialValues={{
          firstname: user.firstname,
          lastname: user.lastname,
          phonenumber: user.phonenumber,
          email: user.email,
        }}
        className="form"
      >
        <FormItem label="First Name:" name="firstname">
          <Input
            id="firstname"
            name="firstname"
            value={input.firstname}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.firstname ? `${errors.firstname}` : ''}
          </div>
        </FormItem>
        <FormItem label="Last Name:" name="lastname">
          <Input
            id="lastname"
            name="lastname"
            value={input.lastname}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.lastname ? `${errors.lastname}` : ''}
          </div>
        </FormItem>
        <FormItem label="Email:" name="email">
          <Input
            id="email"
            name="email"
            value={input.email}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.email ? `${errors.email}` : ''}
          </div>
        </FormItem>
        <FormItem label="Phone Number:" name="phonenumber">
          <Input
            id="phonenumber"
            name="phonenumber"
            value={input.phonenumber}
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
    </div>
  );
}
