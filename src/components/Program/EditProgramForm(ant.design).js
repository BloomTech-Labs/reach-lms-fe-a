import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editProgramAction } from '../../state/actions/programActions';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import schema from '../../validation/Schema';

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

const initialFormErrors = {
  name: '',
  type: '',
  description: '',
};

export default function EditProgramAntDesign() {
  const programToEdit = useSelector(state => state.programReducer.edit_program);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [input, setInput] = useState(programToEdit);
  const user = useSelector(state => state.userReducer);
  const [errors, setErrors] = useState(initialFormErrors);

  if (!user.role) {
    push('/');
  }

  function changeHandler(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function editProgram(e) {
    e.preventDefault();
    // console.log(values);

    function validate() {
      schema
        .validate(input, { abortEarly: false })
        .then(res => {
          console.log(res);
          axiosWithAuth()
            .put(``, input)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          dispatch(editProgramAction(input));
          push('/dashboard');
        })
        .catch(err => {
          console.log(err);
          const emptyErr = {
            name: '',
            type: '',
            description: '',
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
        onFinish={editProgram}
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
            value={input.name}
            onChange={changeHandler}
          />
        </FormItem>

        <FormItem label="Type:" name="type" rules={[{ required: true }]}>
          <Select
            placeholder="Select a program type"
            onChange={changeHandler}
            value={input.type}
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
          name="description"
          rules={[
            {
              required: true,
              message: 'Please add a description for your program!',
            },
          ]}
        >
          <Input
            id="description"
            name="description"
            value={input.description}
            onChange={changeHandler}
          />
        </FormItem>
        <Button type="primary">Submit</Button>
      </Form>
    </div>
  );
}
