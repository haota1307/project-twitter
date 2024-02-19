import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo, useState } from 'react'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useEditModal from 'src/hooks/useEditModal'
import { User } from 'src/types/user.type'

type FormData = Pick<User, 'name' | 'username' | 'bio' | 'date_of_birth' | 'avatar' | 'cover_photo'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

export default function EditModal() {
  const { setProfile } = useContext(AppContext)
  const editModal = useEditModal()

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const onSubmit = () => {}

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      {/* <Input register={register} name='address' placeholder='Địa chỉ' errorMessage={errors.address?.message} /> */}
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
