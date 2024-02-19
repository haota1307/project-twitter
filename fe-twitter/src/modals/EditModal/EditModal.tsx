import { SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useEditModal from 'src/hooks/useEditModal'
import { User } from 'src/types/user.type'
import Datepicker from 'react-tailwindcss-datepicker'

type FormData = Pick<User, 'name' | 'username' | 'bio' | 'date_of_birth' | 'avatar' | 'cover_photo'>

export default function EditModal() {
  const { setProfile, profile } = useContext(AppContext)

  const editModal = useEditModal()

  const [file, setFile] = useState<File>()
  const [name, setName] = useState(profile?.name)
  const [username, setUserame] = useState(profile?.username)
  const [Bio, setBio] = useState(profile?.bio)
  const [avatar, setAvatar] = useState(profile?.avatar)
  const [coverImg, setCoverImg] = useState(profile?.cover_photo)
  const [dateOfBirth, setDateOfBirth] = useState({
    startDate: profile?.date_of_birth,
    endDate: profile?.date_of_birth
  })

  // useEffect(() => {
  //   if (profile) {
  //     setName(profile.name)
  //     setUserame(profile.username as string)
  //     setBio(profile.bio as string)
  //     setAvatar(profile.avatar as string)
  //     setCoverImg(profile.cover_photo as string)
  //   }
  // }, [name, username, Bio, avatar, coverImg, dateOfBirth])

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,

    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = () => {}

  const bodyContent = (
    <div className='flex flex-col gap-4 '>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        register={register}
        name='name'
        placeholder='Name'
        errorMessage={errors.name?.message}
      />
      <Input
        onChange={(e) => setUserame(e.target.value)}
        value={username}
        register={register}
        name='username'
        placeholder='Username'
        errorMessage={errors.username?.message}
      />
      <Input
        onChange={(e) => setBio(e.target.value)}
        value={Bio}
        register={register}
        name='bio'
        placeholder='Bio'
        errorMessage={errors.bio?.message}
      />

      <Datepicker
        containerClassName='mx-1 relative'
        inputClassName='h-auto lg:p-2 text-lg border-2 rounded-sm outline-none text-slate-600 focus:bg-blue-50 focus:border-blue-100 transition w-full'
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
      // disable={loginMutation.isPending}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Edit'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      // footer={footerContent}
    />
  )
}
