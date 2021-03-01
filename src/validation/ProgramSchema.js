import * as yup from 'yup';

export default yup.object().shape({
  programname: yup
    .string()
    .min(5, 'Program name must be at least 5 characters.'),
  programtype: yup
    .string()
    .oneOf(
      [
        '1st Grade',
        '2nd Grade',
        '3rd Grade',
        '4th Grade',
        '5th Grade',
        '6th Grade',
        '7th Grade',
        '8th Grade',
        '9th Grade',
        '10th Grade',
        '11th Grade',
        '12th Grade',
        'Higher',
        'Training',
        'Other',
      ],
      'Program type is required'
    ),
  programdescription: yup
    .string()
    .min(10, 'Description must be at least 10 characters'),
});
