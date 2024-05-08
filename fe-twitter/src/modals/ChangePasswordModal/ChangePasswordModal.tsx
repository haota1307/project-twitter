import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import useChangePasswordModal from 'src/hooks/useChangePasswordModal'
import { Schema, schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'confirm_password' | 'password' | 'old_password'>

const ChangePasswordSchema = schema.pick(['password', 'confirm_password', 'old_password'])

export default function ChangePasswordModal() {
  const changePasswordModal = useChangePasswordModal()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ChangePasswordSchema)
  })

  const changePaswordMutation = useMutation({
    mutationFn: (body: FormData) => userApi.changePassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    changePaswordMutation.mutateAsync(data, {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        changePasswordModal.onClose()
      },
      // Show error
      onError: (error) => {
        setError('old_password', {
          message: (error as any).response?.data.message,
          type: 'Server'
        })
      }
    })
  })

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        name='old_password'
        register={register}
        placeholder='Old password'
        onChange={(e) => setOldPassword(e.target.value)}
        value={oldPassword}
        disabled={changePaswordMutation.isPending}
        errorMessage={errors.old_password?.message}
      />
      <Input
        name='password'
        register={register}
        placeholder='New password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={changePaswordMutation.isPending}
        errorMessage={errors.password?.message}
      />
      <Input
        name='confirm_password'
        register={register}
        placeholder='Confirm password'
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        disabled={changePaswordMutation.isPending}
        errorMessage={errors.confirm_password?.message}
      />
    </div>
  )

  return (
    <>
      <Modal
        disable={changePaswordMutation.isPending}
        onClose={changePasswordModal.onClose}
        isOpen={changePasswordModal.isOpen}
        title='Change password your an account'
        actionLabel='Change'
        onSubmit={onSubmit}
        body={bodyContent}
      />
    </>
  )
}
