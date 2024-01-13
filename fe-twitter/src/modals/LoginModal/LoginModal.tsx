import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import authApi from 'src/apis/auth.api'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useLoginModal from 'src/hooks/useLoginModal'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { toast } from 'react-toastify'
type FormData = Pick<Schema, 'email' | 'password'>

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

const loginSchema = schema.pick(['email', 'password'])

export default function LoginModal() {
  const loginModal = useLoginModal()
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1000
        })
        loginModal.onClose()
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
        disabled={loginMutation.isPending}
        errorMessage={errors.email?.message}
      />
      <Input
        name='password'
        register={register}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loginMutation.isPending}
        errorMessage={errors.password?.message}
      />
    </div>
  )

  return (
    <Modal
      disable={loginMutation.isPending}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}
