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
import ButtonWithGG from 'src/components/ButtonWithGG'
import userApi from 'src/apis/user.api'

type FormData = Pick<Schema, 'email' | 'password' | 'name' | 'confirm_password'>

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

const RegisterSchema = schema.pick(['email', 'password', 'name', 'confirm_password'])

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
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

  const registerMutation = useMutation({
    mutationFn: (body: Pick<FormData, 'email' | 'password' | 'name'>) => authApi.registerAccount(body as any)
  })

  const isLoading = registerMutation.isPending

  const toggleLogin = useCallback(() => {
    if (isLoading) {
      return
    }
    registerModal.onClose()
    loginModal.onOpen()
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
    registerMutation.mutateAsync(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        getProfile()

        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1000
        })
        registerModal.onClose()
      },
      onError: (error) => {
        console.log('error', error)
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
        disabled={registerMutation.isPending}
        errorMessage={errors.email?.message}
      />
      <Input
        name='name'
        register={register}
        placeholder='name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={registerMutation.isPending}
        errorMessage={errors.name?.message}
      />
      <div className={`flex w-full`}>
        <Input
          name='password'
          register={register}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={registerMutation.isPending}
          errorMessage={errors.password?.message}
        />
        <Input
          name='confirm_password'
          register={register}
          placeholder='Confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          disabled={registerMutation.isPending}
          errorMessage={errors.confirm_password?.message}
        />
      </div>
    </div>
  )

  const footerContent = (
    <>
      <ButtonWithGG />
      <div className='text-neutral-400 text-center mt-4 flex justify-center'>
        <p>Already have an account?</p>
        <span onClick={toggleLogin} className='text-blue-600 cursor-pointer hover:underline ml-1'>
          Sign in
        </span>
      </div>
    </>
  )

  return (
    <Modal
      disable={registerMutation.isPending}
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
