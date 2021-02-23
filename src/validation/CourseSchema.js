import * as yup from 'yup';

export default yup.object().shape({
  coursename: yup.string().min(5, 'Course name must be at least 5 characters.'),
  coursecode: yup
    .string()
    .min(5, 'Course name must be at least 5 characters.')
    .max(7, 'Course code must be no longer than 7 characters.'),
  coursedescription: yup
    .string()
    .min(10, 'Description must be at least 10 characters'),
});
