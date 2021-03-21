import * as Yup from 'yup';

export default Yup.object().shape({
  useremail: Yup.string()
    .email('Must be a valid email address')
    .required('Email is required'),
  role: Yup.string()
    .oneOf(['ADMIN', 'TEACHER', 'STUDENT'])
    .required('Role is required'),
  username: Yup.string(),
  firstname: Yup.string(),
  lastname: Yup.string(),
});
