import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm password required')
    .min(6, 'Confirm password length from 6 - 50 characters')
    .max(50, 'Confirm password length from 6 - 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    )
    .oneOf([yup.ref(refString)], 'Confirm password incorrect')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email invalidate')
    .min(6, 'Email length from 6 - 150 characters')
    .max(150, 'Email length from 6 - 150 characters'),
  name: yup
    .string()
    .required('Name is required')
    .email('Name invalidate')
    .min(6, 'Name length from 6 - 150 characters')
    .max(150, 'Name length from 6 - 150 characters'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password length from 6 - 50 characters')
    .max(50, 'Password length from 6 - 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    ),
  confirm_password: handleConfirmPasswordYup('password')
})

export type Schema = yup.InferType<typeof schema>
