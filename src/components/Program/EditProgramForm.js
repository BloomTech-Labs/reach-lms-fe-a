import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editProgramAction } from '../../state/actions/programActions';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import * as yup from 'yup';
import schema from '../../validation/ProgramSchema';

// css
import '../../styles/Form.css';
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
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

const initialFormErrors = {
  programname: '',
  programtype: '',
  programdescription: '',
};

export default function EditProgramAntDesign() {
  const programToEdit = useSelector(state => state.programReducer.edit_program);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [input, setInput] = useState(programToEdit);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState(initialFormErrors);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const changeValues = e => {
    const { name, value } = e.target;
    const valueToUse = value;
    setFormErrors(name, valueToUse);
    setInput({ ...input, [e.target.name]: valueToUse });
  };

  const changeSelect = (value, event) => {
    setFormErrors('programtype', value);
    setInput({ ...input, programtype: value });
  };

  useEffect(() => {
    schema.isValid(input).then(valid => setDisabled(!valid));
  }, [input]);

  function editProgram(e) {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://reach-team-a-be.herokuapp.com/programs/program/${programToEdit.programid}`,
        input
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    dispatch(editProgramAction(input));
    push('/');
  }

  const goBack = () => {
    push('/');
  };

  return (
    <div className="container">
      <h1 className="edit-form-h1">Edit Program</h1>
      <Form
        {...layout}
        name="basic"
        onFinish={editProgram}
        initialValues={{
          programname: programToEdit.programname,
          programtype: programToEdit.programtype,
          programdescription: programToEdit.programdescription,
        }}
        className="form"
      >
        <FormItem label="Program Name:" name="programname">
          <Input
            id="programname"
            name="programname"
            value={input.programname}
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
            value={input.programtype}
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
          <div style={{ color: 'red' }}>
            {errors.programtype ? `${errors.programtype}` : ''}
          </div>
        </FormItem>
        <FormItem label="Program Description:" name="programdescription">
          <TextArea
            showCount
            maxLength={1000}
            id="programdescription"
            name="programdescription"
            value={input.programdescription}
            onChange={changeValues}
            rows={4}
          />
          <div style={{ color: 'red' }}>
            {errors.programdescription ? `${errors.programdescription}` : ''}
          </div>
        </FormItem>
        <div className="button-container">
          <Button onClick={goBack} type="secondary" className="button">
            Cancel
          </Button>
          <Button
            onClick={editProgram}
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
