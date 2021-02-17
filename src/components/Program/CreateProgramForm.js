import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import * as yup from "yup";
import createFormSchema from "../validation/createFormSchema"

//name of program
//type k-12 or higher training other
// description
initialForm = {
    name: '',
    type: '',
    description: '',
}

initialErrors = {
    name: '',
    type: '',
}

function CreateProgramForm() {
    const [ formValues, setFormValues] = useState(initialForm)
    const [ errorValues, setErrorValues] = useState(initialErrors)


  const onSumbit = e => {
      e.preventDefault()
      axiosWithAuth()
      .put(``, newForm)
      .then(res => {
          setFormValues([...formValues, newForm])
      })
      .catch(err => {console.log(err, "You made a booboo!")})
      setFormValues(initialForm)
  }

  const changeHandler = e => {
      yup
      .reach(createFormSchema, name)
      .validate(value)
      .then((valid) => {
          setErrorValues({
                  ...errorValues,
                  [name]: " ",
              })
          })
        .catch((err) => {
            setErrorValues({
                ...errorValues,
                [name]: err.errors[0],
            })
        })
        setFormValues({
            ...formValues, [e.target.name]: e.target.value
        })
    }
        

      


  const newForm = {
      ...formValues
  }

  return (
    <form className="programForm" onSubmit={onSubmit}>
      <label>
        <h3>Name of Program</h3>
        <input value={formValues.name} onChange={changeHandler} name="name" type="text" />
      </label>

      <label>
        <h3>Type of Program</h3>
        <select onChange={changeHandler} value={formValues.type} name="type" type="dropdown">
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
        </select>
      </label>

      <label>
        <h3>Description</h3>
      </label>
      <textarea
        name="description"
        id="description"
        type="text"
        onChange={changeHandler}
        value={formValues.description}
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default CreateProgramForm;
