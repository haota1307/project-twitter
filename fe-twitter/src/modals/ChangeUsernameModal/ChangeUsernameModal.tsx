import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useChangeUsernameModal from 'src/hooks/useChangeUsernameModal'
import { ErrorResponseApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'username'>

const changUsernameSchema = schema.pick(['username'])

export default function ChangeUsernameModal() {
  const { setProfile } = useContext(AppContext)
  const [username, setUsername] = useState('')

  const changeUsernameModal = useChangeUsernameModal()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(changUsernameSchema)
  })

  const changeUsernameMutation = useMutation({
    mutationFn: () => userApi.updateUserProfile({ username: username })
  })

  const onSubmit = handleSubmit((data: any) => {
    changeUsernameMutation.mutateAsync(data, {
      onSuccess: (data) => {
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        setProfile(data.data.result)
        changeUsernameModal.onClose()
      },
      // Show error
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<any>>(error)) {
          const formError = error.response?.data.errors
          if (formError?.username) {
            setError('username', {
              message: formError.username.msg,
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
        name='username'
        register={register}
        placeholder='Enter your username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={changeUsernameMutation.isPending}
        errorMessage={errors.username?.message}
      />
    </div>
  )
  return (
    <>
      <Modal
        disable={changeUsernameMutation.isPending}
        isOpen={changeUsernameModal.isOpen}
        title='Change username'
        actionLabel='Change'
        onClose={changeUsernameModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    </>
  )
}
