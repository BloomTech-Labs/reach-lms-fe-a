import React from 'react';
import { useForm, useRestfulFetch, useUserRole } from '../../hooks';
import {Tags} from '../common';
// ant design
import 'antd/dist/antd.css';
import { Modal, Button, Input, Select, Form } from 'antd';
import { client } from '../../utils/api';

const initialValues = {
  programname: '',
  programtype: '',
  programdescription: '',
};

export default function CreateProgram(props) {
  let { href } = props;
  let { data } = useRestfulFetch(href);
  const { userid } = useUserRole();

  const { values, onChange, resetValues, setValues } = useForm(initialValues);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (data) {
      setValues(prev => ({ ...prev, ...data }));
      form.setFieldsValue({ ...form.getFieldsValue(), ...data });
    }
    if (!href) {
      setValues(initialValues);
      form.setFieldsValue(initialValues);
    }
  }, [data, href, form, setValues]);

  const changeValues = e => {
    const { name, value, type } = e.target;
    const valueToUse = type === 'select' ? Select : value;
    onChange(name, valueToUse);
  };

  const changeSelect = value => {
    onChange('programtype', value);
  };

  function submitForm(values) {
    if (!href) {
      client.postProgram(userid, values);
    } else {
      const editedProgram = {
        programid: data.programid,
        programname: values.programname,
        programtype: values.programtype,
        programdescription: values.programdescription,
      };
      client.patchProgram(editedProgram.programid, editedProgram);
    }
    if (props.hideModal) {
      props.hideModal();
    }
    if (props.onSubmit) {
      props.onSubmit();
    }
    resetValues();
    href = '';
  }

  if (!data && href) {
    return <div>Loading data...</div>;
  } else if (!values) {
    return <div>Error</div>;
  }

  const innerForm = (
    <>
      {!href ? <h1>Create Program</h1> : <h1>Edit Program</h1>}
      <Form
        name="Program Form"
        layout="vertical"
        size="large"
        onFinish={submitForm}
        form={form}
        initialValues={{
          programname: data ? data.programname : '',
          programtype: data ? data.programtype : '',
          programdescription: data ? data.programdescription : '',
        }}
      >
        <Form.Item
          name="programname"
          label="Program Name:"
          rules={[
            {
              min: 5,
              type: 'string',
              required: true,
              message: 'ⓧ Program name must be at least 5 characters.',
            },
          ]}
        >
          <Input
            id="programname"
            name="programname"
            value={values.programname}
            onChange={changeValues}
          />
        </Form.Item>

        <Form.Item
          name="programtype"
          label="Program Type:"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'ⓧ Program type is required.',
            },
          ]}
        >
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
        </Form.Item>

        <Form.Item
          name="programdescription"
          label="Program Description:"
          rules={[
            {
              min: 10,
              type: 'string',
              message: 'ⓧ Program description must be at least 10 characters.',
            },
          ]}
        >
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
        </Form.Item>
        <Tags/>
      </Form>
    </>
  );

  return (
    <>
      {props.isWrapped ? (
        <Modal
          visible={props.visible}
          onCancel={() => {
            props.hideModal();
            href = '';
            form.resetFields();
          }}
          onOk={form.submit}
        >
          {innerForm}
        </Modal>
      ) : (
        <>
          {innerForm}
          <div className="button-container">
            <Button onClick={submitForm} type="primary" className="button">
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
}
