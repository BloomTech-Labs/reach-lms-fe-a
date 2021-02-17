import { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import * as yup from 'yup';
import schema from '../../validation/Schema'

import { addProgram } from "../../state/actions/programActions";

// ant design
import 'antd/dist/antd.css';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


initialValues = {
    name: '',
    type: '',
    description: '',
}

initialFormErrors = {
    name: '',
    type: '',
}

export default function CreateClass() {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const user = useSelector(state => state.userReducer);

  if (!user.role) {
    push("/");
  }
  
  function changeValues(e) {
    e.persist();
    const correctValue = e.target.value;

    function validate() {
      yup
        .reach(schema, e.target.name)
        .validate(correctValue)
        .then((res) => {
          // console.log(res);
          setErrors({ ...errors, [e.target.name]: '' })
        })
        .catch((err) => {
          setErrors({ ...errors, [e.target.name]: err.message })
        })

    }
    validate();
    setValues({ ...values, [e.target.name]: correctValue })
  }

  function submitForm(e) {
    e.preventDefault();
    dispatch(addProgram(values))
    axiosWithAuth()
      .post('', values)
      .then((res) => {
        // console.log({createClass: res})
        //localStorage.setItem("onboarding", "true");
        setValues(initialValues);
        push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      })
  }
    

      




  return (
    <div className="container">
      <h1>Edit Program</h1>
      <Form
        {...layout}
          name="basic"
          initialValues={{
            name: input.name,
            type: input.type,
            option: input.option,
            description: input.description,
          }}
          onFinish={submitForm}
        >
          <FormItem
            label="Name:"
            name="name"
            rules={[
              { required: true, message: 'Please input your program name!' },
            ]}
          >
            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={changeValues}
             />
          </FormItem>
    
          <FormItem label="Type:" name="type" rules={[{ required: true }]}>
            <Select
              placeholder="Select a program type"
              onChange={changeValues}
              value={values.type}
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
              <Option value="10th">-10th Grade-</Opion>
              <Option value="11th">-11th Grade-</Option>
              <Option value="12th">-12th Grade-</Option>
              <Option value="higher">-Higher-</Option>
              <Option value="training">-Training-</Option>
              <Option value="other">-Other-</Option>
            </Select>
          </FormItem>
    
          <FormItem
            label="Description:"
            name="description"
            rules={[
              {
                required: false,
                message: 'Please add a description for your program!',
              },
            ]}
          >
            <Input
              id="description"
              name="description"
              value={values.description}
              onChange={changeValues}
            />
          </FormItem>
            <Button type="primary">Submit</Button>
          </Form>
        </div>
      );
          }
     

  
          
  
    
