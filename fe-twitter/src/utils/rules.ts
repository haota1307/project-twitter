import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('confirm password là bắt buộc')
    .min(5, 'Độ dài confirm password từ 5 - 160 ký tự')
    .max(160, 'Độ dài confirm password từ 5 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Password nhập lại không khớp')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài Email từ 5 - 160 ký tự')
    .max(160, 'Độ dài Email từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(5, 'Độ dài Password từ 5 - 160 ký tự')
    .max(160, 'Độ dài Password từ 5 - 160 ký tự'),
  confirm_password: handleConfirmPasswordYup('password')
})

export type Schema = yup.InferType<typeof schema>
