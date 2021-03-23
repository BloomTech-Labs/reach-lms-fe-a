import * as Yup from 'yup';

export default Yup.object().shape({
  role: Yup.string()
    .oneOf(['ADMIN', 'TEACHER', 'STUDENT'])
    .required('Role is required'),
});
