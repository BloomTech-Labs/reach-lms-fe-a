
import * as yup from 'yup'

const createFormSchema = yup.object().shape({

name: yup
    .string()
    .min(1, "Username must be at least 2 characters")
    .required("Program name is Required"),
type: yup
    .string()
    .oneOf(['K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', 
                '9th', '10th', '11th', '12th', 'higher', 'training', 'other'], 
                "Type is required"),

})
export default formSchema