import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import useResetPasswordModal from 'src/hooks/useResetPasswordModal'
import { ErrorResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'password' | 'confirm_password' | 'forgot_password_token'>

const resetPasswordSchema = schema.pick(['password', 'confirm_password', 'forgot_password_token'])

export default function ResetPasswordModal() {
  const resetPasswordModal = useResetPasswordModal()
  const navigate = useNavigate()
  const location = useLocation()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { forgot_password_token } = location.state || {}

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordSchema)
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (body: FormData) => http.post('users/reset-password', body)
  })

  const onSubmit = handleSubmit((data) => {
    const newData = { ...data, forgot_password_token }
    resetPasswordMutation.mutateAsync(newData, {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        navigate('/')
      },
      // Show error
      onError: (error) => {
        console.log('error', error)
        // Check error 422
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<any>>(error)) {
          const formError = error.response?.data.errors
          if (formError?.password) {
            setError('password', {
              message: formError.password.msg,
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
        name='password'
        register={register}
        placeholder='New password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={resetPasswordMutation.isPending}
        errorMessage={errors.password?.message}
      />
      <Input
        name='confirm_password'
        register={register}
        placeholder='Confirm password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        disabled={resetPasswordMutation.isPending}
        errorMessage={errors.confirm_password?.message}
      />
      <Input
        name='forgot_password_token'
        register={register}
        onChange={() => {}}
        value={forgot_password_token}
        hidden
      />
    </div>
  )

  return (
    <Modal
      disable={resetPasswordMutation.isPending}
      isOpen={resetPasswordModal.isOpen}
      title='Change password your an account'
      actionLabel='Change'
      onClose={resetPasswordModal.onClose}
      onBackHome
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}
