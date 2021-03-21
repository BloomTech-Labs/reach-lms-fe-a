import React from 'react';
import schema from '../../validation/ProgramSchema';
import { useFormWithErrors, useRestfulFetch, useUserRole } from '../../hooks';
// ant design
import 'antd/dist/antd.css';
import { Button, Input, Select, Form } from 'antd';
import { client } from '../../utils/api';

const initialValues = {
  programname: '',
  programtype: '',
  programdescription: '',
};

export default function CreateProgram(props) {
  const { href } = props;
  const { data } = useRestfulFetch(href);
  const { userid } = useUserRole();

  const {
    values,
    errors,
    disabled,
    onChange,
    resetValues,
    setValues,
  } = useFormWithErrors(schema, initialValues);

  React.useEffect(() => {
    if (data) {
      setValues(prev => ({ ...prev, ...data }));
    }
  }, [data, setValues]);

  const changeValues = e => {
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    onChange(name, valueToUse);
  };

  const changeSelect = value => {
    onChange('programtype', value);
  };

  function submitForm(e) {
    e.preventDefault();
    if (!href) {
      client.postProgram(userid, values);
    } else {
      client.patchProgram(data.programid, values);
    }
    resetValues();
  }

  if (!data && href) {
    return <div>Loading data...</div>;
  } else if (!data && !href) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1>Create Program</h1>
      <Form
        name="Program Form"
        layout="vertical"
        size="large"
        onFinish={submitForm}
      >
        <Form.Item htmlFor="programname" label="Program Name:" validateStatus>
          <Input
            id="programname"
            name="programname"
            value={values.programname}
            onChange={changeValues}
          />
          <div style={{ color: 'red' }}>
            {errors.programname ? `${errors.programname}` : ''}
          </div>
        </Form.Item>

        <Form.Item htmlFor="programtype" label="Program Type:">
          <Select
            id="programtype"
            name="programtype"
            value={values.programtype}
            placeholder="Select a program type"
            onSelect={(value, event) => changeSelect(value, event)}
            data-testid="select"
          >
            <Select.Option data-testid="select-option" value="">
              - Select A Type -
            </Select.Option>
            <Select.Option data-testid="select-option" value="1st Grade">
              -1st Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="2nd Grade">
              -2nd Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="3rd Grade">
              -3rd Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="4th Grade">
              -4th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="5th Grade">
              -5th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="6th Grade">
              -6th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="7th Grade">
              -7th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="8th Grade">
              -8th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="9th Grade">
              -9th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="10th Grade">
              -10th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="11th Grade">
              -11th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="12th Grade">
              -12th Grade-
            </Select.Option>
            <Select.Option data-testid="select-option" value="Higher">
              -Higher-
            </Select.Option>
            <Select.Option data-testid="select-option" value="Training">
              -Training-
            </Select.Option>
            <Select.Option data-testid="select-option" value="Other">
              -Other-
            </Select.Option>
          </Select>
          <div style={{ color: 'red' }}>
            {errors.programtype ? `${errors.programtype}` : ''}
          </div>
        </Form.Item>

        <Form.Item htmlFor="programdescription" label="Program Description:">
          <Input.TextArea
            onKeyPress={evt => {
              if (evt.key === 'Enter') {
                submitForm();
              }
            }}
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
        </Form.Item>
        <div className="button-container">
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
    </>
  );
}
