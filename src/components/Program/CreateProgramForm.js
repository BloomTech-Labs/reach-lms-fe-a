import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import schema from '../../validation/Schema';
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
  name: '',
  type: '',
};

export default function CreateClass() {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const user = useSelector(state => state.userReducer);

  if (!user.role) {
    push('/');
  }

  const changeValues = e => {
    e.persist();
    const correctValue = e.target.value;

    function validate() {
      yup
        .reach(schema, e.target.name)
        .validate(correctValue)
        .then(res => {
          // console.log(res);
          setErrors({ ...errors, [e.target.name]: '' });
        })
        .catch(err => {
          setErrors({ ...errors, [e.target.name]: err.message });
        });
    }
    validate();
    setValues({ ...values, [e.target.name]: correctValue });
    console.log(values);
  };

  const changeSelect = e => {
    setValues({ ...values, programtype: e });
  };

  function submitForm(e) {
    e.preventDefault();
    dispatch(addProgram(values));
    console.log(values);
    axiosWithAuth()
      .post('https://reach-team-a-be.herokuapp.com/programs', values)
      .then(res => {
        // console.log({createClass: res})
        //localStorage.setItem("onboarding", "true");
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
        <FormItem
          label="Name:"
          name="programname"
          rules={[
            { required: true, message: 'Please input your program name!' },
          ]}
        >
          <Input
            id="programname"
            name="programname"
            value={values.name}
            onChange={changeValues}
          />
        </FormItem>

        <FormItem label="Type:" name="programtype" rules={[{ required: true }]}>
          <Select
            id="programtype"
            name="programtype"
            value={values.programtype}
            placeholder="Select a program type"
            onChange={changeSelect}
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
        </FormItem>
        <FormItem
          label="Description:"
          name="programdescription"
          rules={[
            {
              required: true,
              message: 'Please add a description for your program!',
            },
          ]}
        >
          {/* <Input
            id="programdescription"
            name="programdescription"
            value={values.programdescription}
            onChange={changeValues}
          /> */}
          <TextArea
            showCount
            maxLength={1000}
            id="programdescription"
            name="programdescription"
            value={values.programdescription}
            onChange={changeValues}
          />
        </FormItem>
        <Button onClick={submitForm} type="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}
