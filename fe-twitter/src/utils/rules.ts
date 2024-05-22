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
  username: yup
    .string()
    .required('Username is required')
    .min(6, 'Username length from 6 - 150 characters')
    .max(150, 'Username length from 6 - 150 characters'),
  bio: yup
    .string()
    .required('Name is required')
    .min(1, 'Bio length from 1 - 150 characters')
    .max(150, 'Bio length from 1 - 150 characters'),
  name: yup
    .string()
    .required('Name is required')
    .min(6, 'Name length from 6 - 150 characters')
    .max(100, 'Name length from 6 - 150 characters'),
  date_of_birth: yup.date().max(new Date(), 'Please choose a date in the past'),
  avatar: yup.string().max(1000, 'Avatar url max length 1000 characters'),
  password: yup
    .string()
    .required('Password required')
    .min(6, 'Password length from 6 - 50 characters')
    .max(50, 'Password length from 6 - 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    ),
  old_password: yup
    .string()
    .required('Old password required')
    .min(6, 'Old password length from 6 - 50 characters')
    .max(50, 'Old password length from 6 - 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Old password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    ),
  confirm_password: handleConfirmPasswordYup('password'),
  forgot_password_token: yup.string().required('Token is required')
})

export type Schema = yup.InferType<typeof schema>
