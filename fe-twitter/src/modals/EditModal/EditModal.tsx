import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useEditModal from 'src/hooks/useEditModal'
import { User } from 'src/types/user.type'
import Datepicker from 'react-tailwindcss-datepicker'
import userApi from 'src/apis/user.api'
import { setProfileToLS } from 'src/utils/auth'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useMutation } from '@tanstack/react-query'

type FormData = Pick<User, 'name' | 'bio' | 'date_of_birth'>

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
const editSchema = schema.pick(['name', 'bio', 'date_of_birth'])

export default function EditModal() {
  const { setProfile, profile } = useContext(AppContext)

  const editModal = useEditModal()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(profile?.name)
  const [bio, setBio] = useState(profile?.bio)
  const [dateOfBirth, setDateOfBirth] = useState<any>({
    startDate: profile?.date_of_birth as Date,
    endDate: profile?.date_of_birth as Date
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(editSchema as any)
  })

  const editProfileMutation = useMutation({
    mutationFn: (body: FormData) => userApi.updateUserProfile(body)
  })

  const onSubmit = handleSubmit((data) => {
    editProfileMutation.mutateAsync(data, {
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
        console.log('error', error)

        // Check error 422
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
          const formError = error.response?.data.errors
          console.log('Login eerr:', error.response?.data)
          if (formError?.email) {
            setError('name', {
              message: formError.email.msg,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('bio', {
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
      <Datepicker
        containerClassName='mx-1 relative'
        inputClassName='h-auto p-1 text-lg border-2 rounded-sm outline-none text-slate-600 focus:bg-blue-50 focus:border-blue-100 transition w-full'
        value={dateOfBirth}
        useRange={false}
        asSingle={true}
        onChange={(newValue) => setDateOfBirth(newValue as any)}
        displayFormat={'DD/MM/YYYY'}
        placeholder={'Date of birth'}
        maxDate={new Date()}
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
