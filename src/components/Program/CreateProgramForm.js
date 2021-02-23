import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import schema from '../../validation/ProgramSchema';
import { addProgram } from '../../state/actions/programActions';

// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  programname: '',
  programtype: '',
  programdescription: '',
};

const initialFormErrors = {
  programname: '',
  programtype: '',
  programdescription: '',
};

export default function CreateProgram() {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  const user = useSelector(state => state.userReducer);

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

  const changeSelect = (value, event) => {
    setFormErrors('programtype', value);
    setValues({ ...values, programtype: value });
  };

  useEffect(() => {
    schema.isValid(values).then(valid => setDisabled(!valid));
  }, [values]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(addProgram(values));
    console.log(values);
    axiosWithAuth()
      .post(
        `https://reach-team-a-be.herokuapp.com/programs/${user.userid}/program`,
        values
      )
      .then(res => {
        console.log(res);
        setValues(initialValues);
        push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <h1>Create Program</h1>
      <Form {...layout} name="basic" onFinish={submitForm}>
        <FormItem label="Program Name:" name="programname" validateStatus>
          <Input
            id="programname"
            name="programname"
            value={values.name}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.programname ? `${errors.programname}` : ''}
          </div>
        </FormItem>

        <FormItem label="Program Type:" name="programtype">
          <Select
            id="programtype"
            name="programtype"
            value={values.programtype}
            placeholder="Select a program type"
            onSelect={(value, event) => changeSelect(value, event)}
          >
            <Option value="">- Select A Type -</Option>
            <Option value="1st">-1st Grade-</Option>
            <Option value="2nd">-2nd Grade-</Option>
            <Option value="3rd">-3rd Grade-</Option>
            <Option value="4th">-4th Grade-</Option>
            <Option value="5th">-5th Grade-</Option>
            <Option value="6th">-6th Grade-</Option>
            <Option value="7th">-7th Grade-</Option>
            <Option value="8th">-8th Grade-</Option>
            <Option value="9th">-9th Grade-</Option>
            <Option value="10th">-10th Grade-</Option>
            <Option value="11th">-11th Grade-</Option>
            <Option value="12th">-12th Grade-</Option>
            <Option value="higher">-Higher-</Option>
            <Option value="training">-Training-</Option>
            <Option value="other">-Other-</Option>
          </Select>
          <div style={{ color: 'red' }}>
            {errors.programtype ? `${errors.programtype}` : ''}
          </div>
        </FormItem>

        <FormItem label="Program Description:" name="programdescription">
          <TextArea
            showCount
            maxLength={500}
            id="programdescription"
            name="programdescription"
            value={values.programdescription}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.programdescription ? `${errors.programdescription}` : ''}
          </div>
        </FormItem>
        <Button onClick={submitForm} type="primary" disabled={disabled}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
