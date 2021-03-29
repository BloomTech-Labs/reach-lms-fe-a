import { useState } from 'react';

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  const onChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    values,
    onChange,
    resetValues,
    setValues,
  };
};
