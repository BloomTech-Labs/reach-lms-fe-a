import { useState, useEffect } from 'react';
import * as yup from 'yup';

export const useFormWithErrors = (
  schema,
  initialValues,
  initialFormErrors = undefined
) => {
  if (!initialFormErrors) {
    initialFormErrors = initialValues;
  }

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const onChange = (name, value) => {
    setFormErrors(name, value);
    setValues({ ...values, [name]: value });
  };

  const resetValues = () => {
    setValues(initialValues);
    setErrors(initialFormErrors || initialValues);
    setDisabled(true);
  };

  useEffect(() => {
    schema.isValid(values).then(valid => setDisabled(!valid));
  }, [schema, values]);

  return {
    values,
    errors,
    disabled,
    onChange,
    resetValues,
  };
};
