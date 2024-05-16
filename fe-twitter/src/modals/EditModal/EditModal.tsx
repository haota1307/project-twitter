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

type FormData = Pick<User, 'name' | 'bio' | 'date_of_birth' | 'avatar' | 'cover_photo'>

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
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = () => {
    setLoading(true)
    userApi
      .updateUserProfile({
        name,
        bio,
        dateOfBirth: dateOfBirth.startDate
      })
      .then((data) => {
        setProfile(data.data.result)
        setProfileToLS(data.data.result)
        toast.success(data.data.message, {
          autoClose: 1000,
          position: 'top-center'
        })
        editModal.onClose()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
        placeholder={'Date of Birth'}
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
