import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import schema from '../../validation/ProgramSchema';
import { addProgram } from '../../state/actions/programActions';

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

  const goBack = () => {
    push('/');
  };

  return (
    <div className="container">
      <h1 className="edit-form-h1">Create Program</h1>
      <Form {...layout} name="basic" onFinish={submitForm} className="form">
        <FormItem htmlFor="programname" label="Program Name:" validateStatus>
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

        <FormItem htmlFor="programtype" label="Program Type:">
          <Select
            id="programtype"
            name="programtype"
            value={values.programtype}
            placeholder="Select a program type"
            onSelect={(value, event) => changeSelect(value, event)}
            data-testid="select"
          >
            <Option data-testid="select-option" value="">
              - Select A Type -
            </Option>
            <Option data-testid="select-option" value="1st Grade">
              -1st Grade-
            </Option>
            <Option data-testid="select-option" value="2nd Grade">
              -2nd Grade-
            </Option>
            <Option data-testid="select-option" value="3rd Grade">
              -3rd Grade-
            </Option>
            <Option data-testid="select-option" value="4th Grade">
              -4th Grade-
            </Option>
            <Option data-testid="select-option" value="5th Grade">
              -5th Grade-
            </Option>
            <Option data-testid="select-option" value="6th Grade">
              -6th Grade-
            </Option>
            <Option data-testid="select-option" value="7th Grade">
              -7th Grade-
            </Option>
            <Option data-testid="select-option" value="8th Grade">
              -8th Grade-
            </Option>
            <Option data-testid="select-option" value="9th Grade">
              -9th Grade-
            </Option>
            <Option data-testid="select-option" value="10th Grade">
              -10th Grade-
            </Option>
            <Option data-testid="select-option" value="11th Grade">
              -11th Grade-
            </Option>
            <Option data-testid="select-option" value="12th Grade">
              -12th Grade-
            </Option>
            <Option data-testid="select-option" value="Higher">
              -Higher-
            </Option>
            <Option data-testid="select-option" value="Training">
              -Training-
            </Option>
            <Option data-testid="select-option" value="Other">
              -Other-
            </Option>
          </Select>
          <div style={{ color: 'red' }}>
            {errors.programtype ? `${errors.programtype}` : ''}
          </div>
        </FormItem>

        <FormItem htmlFor="programdescription" label="Program Description:">
          <TextArea
            showCount
            maxLength={500}
            id="programdescription"
            name="programdescription"
            value={values.programdescription}
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
            onClick={submitForm}
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
