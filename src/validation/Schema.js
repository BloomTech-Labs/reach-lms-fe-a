import * as yup from 'yup';

export default yup.object().shape({
  programname: yup.string().min(1, 'Please name your new program.'),
  programtype: yup
    .string()
    .min(1, 'Please select the type of program this will be.'),
  programdescription: yup.string().min(1, 'Please describe the program.'),
});
