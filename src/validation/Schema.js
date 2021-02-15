import * as yup from 'yup'

export default yup.object().shape({
    name: yup
    .string()
    .min(1,'Please name your new program.'),
    type: yup
    .string()
    .min(1,'Please select the type of program this will be.'),
    description: yup
    .string()
    .min(1,'Please describe the program.'),
    
})