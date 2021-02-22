import * as yup from 'yup';

export default yup.object().shape({
  firstname: yup.string().min(2, 'Program name must be at least 2 characters.'),
  lastname: yup.string().min(2, 'Program name must be at least 2 characters.'),
  phonenumber: yup
    .string()
    .min(10, 'Phone number must be at least 10 characters'),
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('email is required'),
});
