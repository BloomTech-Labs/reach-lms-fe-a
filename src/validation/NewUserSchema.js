import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Email is required'),
  roleType: Yup.string()
    .oneOf(['ADMIN', 'TEACHER', 'STUDENT'])
    .required('Role is required'),
  username: Yup.string(),
  firstname: Yup.string(),
  lastname: Yup.string(),
});
