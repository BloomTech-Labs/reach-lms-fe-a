import * as yup from 'yup';

export default yup.object().shape({
  modulename: yup.string().min(5, 'Module name must be at least 5 characters.'),
  moduledescription: yup
    .string()
    .min(10, 'Description must be at least 10 characters'),
  modulecontent: yup.string().min(10, 'Content must be at least 10 characters'),
});
