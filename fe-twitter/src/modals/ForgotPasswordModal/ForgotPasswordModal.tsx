import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import useForgotPasswordModal from 'src/hooks/useForgotpasswordModal'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email'>

const forgotPasswordSchema = schema.pick(['email'])

export default function ForgotPasswordModal() {
  const forgotPasswordModal = useForgotPasswordModal()
  const [email, setEmail] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordSchema)
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: FormData) => userApi.forgotPassword({ email: email })
  })

  const onSubmit = handleSubmit((data) => {
    forgotPasswordMutation.mutateAsync(data, {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        forgotPasswordModal.onClose()
      },
      // Show error
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<any>>(error)) {
          const formError = error.response?.data.errors
          if (formError?.email) {
            setError('email', {
              message: formError.email.msg,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        name='email'
        register={register}
        placeholder='Enter your email forgot password'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={forgotPasswordMutation.isPending}
        errorMessage={errors.email?.message}
      />
    </div>
  )

  return (
    <Modal
      disable={forgotPasswordMutation.isPending}
      isOpen={forgotPasswordModal.isOpen}
      title='Forgot password'
      actionLabel='Send'
      onClose={forgotPasswordModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}
