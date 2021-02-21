import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import schema from '../../validation/Schema';
import { editUser } from '../../state/actions/userActions';

// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialFormErrors = {
  userid: '',
  firstname: '',
  lastname: '',
  phonenumber: '',
  email: '',
  role: '',
};

export default function EditUserForm() {
  const userToEdit = useSelector(state => state.userReducer.edit_user);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector(state => state.userReducer);
  const [input, setInput] = useState({
    userid: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    phonenumber: user.phonenumber,
    email: user.email,
    role: user.role,
  });
  const [errors, setErrors] = useState(initialFormErrors);

  if (!user.role) {
    push('/');
  }

  function changeHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function editUserSubmit(e) {
    e.preventDefault();

    function validate() {
      schema
        .validate(input, { abortEarly: false })
        .then(res => {
          console.log(res);
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
        })
        .catch(err => {
          console.log(err);
          const emptyErr = {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
          };
          err.inner.forEach(element => {
            emptyErr[element.path] = element.message;
          });
          setErrors(emptyErr);
        });
    }

    validate();
  }

  return (
    <div className="container">
      <h1>Edit User</h1>
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
      >
        <FormItem
          label="First Name:"
          name="firstname"
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input
            id="firstname"
            name="firstname"
            value={input.firstname}
            onChange={changeHandler}
          />
        </FormItem>
        {/* <div>{errors.firstname ? `${errors.firstname}` : ''}</div> */}

        <FormItem
          label="Last Name:"
          name="lastname"
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input
            id="lastname"
            name="lastname"
            value={input.lastname}
            onChange={changeHandler}
          />
        </FormItem>
        {/* <div>{errors.lastname ? `${errors.lastname}` : ''}</div> */}

        <FormItem
          label="Email:"
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input
            id="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
          />
        </FormItem>
        {/* <div>{errors.email ? `${errors.email}` : ''}</div> */}

        <FormItem
          label="Phone Number:"
          name="phonenumber"
          rules={[
            { required: true, message: 'Please input your phone number' },
          ]}
        >
          <Input
            id="phonenumber"
            name="phonenumber"
            value={input.phonenumber}
            onChange={changeHandler}
          />
        </FormItem>
        {/* <div>{errors.phonenumber ? `${errors.phonenumber}` : ''}</div> */}

        <Button onClick={editUserSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
