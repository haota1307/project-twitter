import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Password required')
    .min(5, 'Độ dài Password từ 5 - 160 ký tự')
    .max(160, 'Độ dài Password từ 5 - 160 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    )
    .oneOf([yup.ref(refString)], 'Password nhập lại không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài Email từ 5 - 160 ký tự')
    .max(160, 'Độ dài Email từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password required')
    .min(5, 'Độ dài Password từ 5 - 160 ký tự')
    .max(160, 'Độ dài Password từ 5 - 160 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    ),
  confirm_password: handleConfirmPasswordYup('password')
})

export type Schema = yup.InferType<typeof schema>
