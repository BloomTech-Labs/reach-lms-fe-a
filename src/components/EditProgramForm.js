import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProgramAction } from "../actions/programActions";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import schema from '../validation/Schema';

const initialFormErrors = {
    name: '',
    type: '',
    description: '',
  }
export default function EditProgram() {
  const programToEdit = useSelector(state => state.programReducer.edit_program);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [input, setInput] = useState(programToEdit);
  const user = useSelector(state => state.userReducer);
  const [errors, setErrors] = useState(initialFormErrors);
  
  if (!user.role) {
    push("/");
  }

  function changeHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  function editProgram(e) {
    e.preventDefault();
    // console.log(values);

    function validate() {
      schema
        .validate(input, { abortEarly: false })
        .then((res) => {
          console.log(res);
          axiosWithAuth()
            .put(``, input)
            .then(res => console.log(res))
            .catch(err => console.log(err))
          dispatch(editProgramAction(input));
          push("/dashboard");

        })
        .catch((err) => {
          console.log(err);
          const emptyErr = {
            name: '',
            type: '',
            description: '',
          };
          err.inner.forEach(element => {
            emptyErr[element.path] = element.message;


          });
          setErrors(emptyErr)

        })

    }

    validate();
    }

    return (

      <div className="container">
        <h1>Edit Program</h1>
        <form onSubmit={editProgram}>
          <label htmlFor="name">Name:
        <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={changeHandler}
            />
          </label>
          <div>{errors.name ? `${errors.name}` : ""}</div>
          
          <label htmlFor="type">Type:
        <input
              type="dropdown"
              id="type"
              name="type"
              value={input.type}
              onChange={changeHandler}
            >
            <option value="">- Select A Type -</option>
            <option value="K">-K-</option>
            <option value="1st">-1st Grade-</option>
            <option value="2nd">-2nd Grade-</option>
            <option value="3rd">-3rd Grade-</option>
            <option value="4th">-4th Grade-</option>
            <option value="5th">-5th Grade-</option>
            <option value="6th">-6th Grade-</option>
            <option value="7th">-7th Grade-</option>
            <option value="8th">-8th Grade-</option>
            <option value="9th">-9th Grade-</option>
            <option value="10th">-10th Grade-</option>
            <option value="11th">-11th Grade-</option>
            <option value="12th">-12th Grade-</option>
            <option value="higher">-Higher-</option>
            <option value="training">-Training-</option>
            <option value="other">-Other-</option>
            </input>
          </label>
          <div>{errors.type ? `${errors.type}` : ""}</div>
          
          <label htmlFor="description">Description:
        <input
              type="text"
              id="description"
              name="description"
              value={input.description}
              onChange={changeHandler}
            />
          </label>
          <div>{errors.description ? `${errors.description}` : ""}</div>

          <button>Submit</button>
        </form>
      </div>
    );
  };