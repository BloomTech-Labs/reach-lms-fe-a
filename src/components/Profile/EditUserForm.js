import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import schema from '../../validation/Schema';
import { editUser } from '../../state/actions/userActions';

const initialFormErrors = {
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
};

export default function EditUserForm() {
  const userToEdit = useSelector(state => state.userReducer.edit_user);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector(state => state.userReducer);
  const [input, setInput] = useState({
    firstname: user.fname,
    lastname: user.lname,
    phonenumber: user.phone,
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
              `https://reach-team-a-be.herokuapp.com/users/user/${user.id}`,
              input
            )
            .then(res => console.log('Successful Patch: ', res))
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
      <form onSubmit={editUserSubmit}>
        <label htmlFor="firstname">
          First Name:
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={input.firstname}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.firstname ? `${errors.firstname}` : ''}</div>

        <label htmlFor="lastname">
          Last Name:
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={input.lastname}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.lastname ? `${errors.lastname}` : ''}</div>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.email ? `${errors.email}` : ''}</div>

        <label htmlFor="phonenumber">
          Phone Number:
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={input.phonenumber}
            onChange={changeHandler}
          />
        </label>
        <div>{errors.phonenumber ? `${errors.phonenumber}` : ''}</div>

        <button>Submit</button>
      </form>
    </div>
  );
}
