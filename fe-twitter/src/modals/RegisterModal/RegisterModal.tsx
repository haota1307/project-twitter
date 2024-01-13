import { useMutation } from '@tanstack/react-query'
import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

import authApi from 'src/apis/auth.api'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import useRegisterModal from 'src/hooks/useRegisterModal'
import useLoginModal from 'src/hooks/useLoginModal'

type FormData = Schema

type DataError = {
  location: string
  msg: string
  path: string
  type: string
  value: string
}

type FormDataError = {
  email: DataError
  password: DataError
}

const RegisterSchema = schema

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(RegisterSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Pick<FormData, 'email' | 'password'>) => authApi.registerAccount(body)
  })

  const isLoading = registerAccountMutation.isPending

  const toggleLogin = useCallback(() => {
    if (isLoading) {
      return
    }
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal, isLoading])

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1000
        })
        registerModal.onClose()
        navigate('/')
      },
      // Show error
      onError: (error) => {
        console.log('error', error)

        // Check error 422
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
          const formError = error.response?.data.errors
          if (formError?.email) {
            setError('email', {
              message: formError.email.msg,
              type: 'Server'
            })
          }
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
        name='email'
        register={register}
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={registerAccountMutation.isPending}
        errorMessage={errors.email?.message}
      />
      <Input
        name='password'
        register={register}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={registerAccountMutation.isPending}
        errorMessage={errors.password?.message}
      />
      <Input
        name='confirm_password'
        register={register}
        placeholder='Confirm password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        disabled={registerAccountMutation.isPending}
        errorMessage={errors.confirm_password?.message}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4 flex justify-center'>
      <p>Already have an account?</p>
      <span onClick={toggleLogin} className='text-blue-600 cursor-pointer hover:underline ml-1'>
        Sign in
      </span>
    </div>
  )

  return (
    <Modal
      disable={registerAccountMutation.isPending}
      isOpen={registerModal.isOpen}
      title='Create an account'
      actionLabel='Register'
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
