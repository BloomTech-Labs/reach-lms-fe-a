import * as yup from 'yup';

export default yup.object().shape({
  programname: yup
    .string()
    .min(5, 'Program name must be at least 5 characters.'),
  programtype: yup
    .string()
    .oneOf(
      [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
        '9th',
        '10th',
        '11th',
        '12th',
        'higher',
        'training',
        'other',
      ],
      'Program type is required'
    ),
  programdescription: yup
    .string()
    .min(10, 'Description must be at least 10 characters'),
});
