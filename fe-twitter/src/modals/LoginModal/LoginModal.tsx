import { useMutation } from '@tanstack/react-query'
import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import useRegisterModal from 'src/hooks/useRegisterModal'
import ButtonWithGG from 'src/components/ButtonWithGG'
import userApi from 'src/apis/user.api'

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
  const registerModal = useRegisterModal()

  const { setIsAuthenticated, setProfile } = useContext(AppContext)

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

  const isLoading = loginMutation.isPending

  const toggleLogin = useCallback(() => {
    if (isLoading) {
      return
    }
    registerModal.onOpen()
    loginModal.onClose()
  }, [registerModal, loginModal, isLoading])

  const getProfile = () => {
    userApi
      .getProfile()
      .then((res) => {
        setProfile(res.data.result[0])
        localStorage.setItem('profile', JSON.stringify(res.data.result[0]))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutateAsync(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        getProfile()
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        loginModal.onClose()
      },
      // Show error
      onError: (error) => {
        console.log('error', error)

        // Check error 422
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
          const formError = error.response?.data.errors
          console.log('Login eerr:', error.response?.data)
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

  const footerContent = (
    <>
      <ButtonWithGG />
      <div className='text-neutral-400 text-center mt-4 flex justify-center'>
        <p>You don't have an account?</p>
        <span onClick={toggleLogin} className='text-blue-600 cursor-pointer hover:underline ml-1'>
          Create account
        </span>
      </div>
    </>
  )

  return (
    <Modal
      disable={loginMutation.isPending}
      isOpen={loginModal.isOpen}
      title='Login your an account'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
