import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useEditModal from 'src/hooks/useEditModal'
import { User } from 'src/types/user.type'
import userApi from 'src/apis/user.api'
import { setProfileToLS } from 'src/utils/auth'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useMutation } from '@tanstack/react-query'
import { formatDate } from 'src/utils/date'

type FormData = Pick<User, 'name' | 'bio' | 'date_of_birth'>

type DataError = {
  location: string
  msg: string
  path: string
  type: string
  value: string
}

type FormDataError = {
  name: DataError
  bio: DataError
  date_of_birth: DataError
}
const editSchema = schema.pick(['name', 'bio', 'date_of_birth'])

export default function EditModal() {
  const { setProfile, profile } = useContext(AppContext)

  const editModal = useEditModal()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(profile?.name)
  const [bio, setBio] = useState(profile?.bio)
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(profile?.date_of_birth as Date))

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(editSchema as any)
  })

  const editProfileMutation = useMutation({
    mutationFn: (body: FormData) =>
      userApi.updateUserProfile({ ...body, date_of_birth: new Date(dateOfBirth).toISOString().split('T')[0] })
  })

  const onSubmit = handleSubmit((data) => {
    setLoading(true)
    editProfileMutation
      .mutateAsync(data, {
        onSuccess: (data) => {
          setProfile(data.data.result)
          setProfileToLS(data.data.result)
          toast.success(data.data.message, {
            autoClose: 1000,
            position: 'top-center'
          })
          editModal.onClose()
        },
        // Show error
        onError: (error) => {
          // Check error 422
          if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
            const formError = error.response?.data.errors
            if (formError?.name) {
              setError('name', {
                message: formError.name.msg,
                type: 'Server'
              })
            }
            if (formError?.bio) {
              setError('bio', {
                message: formError.bio.msg,
                type: 'Server'
              })
            }
            if (formError?.date_of_birth) {
              setError('date_of_birth', {
                message: formError.date_of_birth.msg,
                type: 'Server'
              })
            }
          }
        }
      })
      .finally(() => setLoading(false))
  })

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        register={register}
        name='name'
        placeholder='Name'
        errorMessage={errors.name?.message}
      />
      <Input
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        register={register}
        name='bio'
        placeholder='Bio'
        errorMessage={errors.bio?.message}
      />
      <Input
        onChange={(e) => setDateOfBirth(new Date(e.target.value))}
        value={dateOfBirth.toISOString().split('T')[0]}
        register={register}
        name='date_of_birth'
        placeholder='Date of birth'
        errorMessage={errors.date_of_birth?.message}
        type='date'
      />
    </div>
  )

  return (
    <Modal
      disable={loading}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Edit'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}
