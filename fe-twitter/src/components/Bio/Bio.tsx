import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from '../Button'
import { IoCalendarOutline } from 'react-icons/io5'
import { formatDate } from 'src/utils/date'
import useEditModal from 'src/hooks/useEditModal'

interface BioProps {
  userId: string
}

export default function Bio() {
  const { profile } = useContext(AppContext)
  const editModal = useEditModal()
  return (
    <>
      <div className='border-b pb-4'>
        <div className='flex justify-end p-2'>
          <Button secondary label='Edit' onClick={editModal.onOpen} />
        </div>
        <div className='mt-8 px-4'>
          <div className='flex flex-col'>
            <p className='text-black text-2xl font-semibold'>{profile?.name}</p>
            <p className='text-black/50 text-md'>@{profile?.username}</p>
          </div>
          <div className='flex flex-col mt-4'>
            <p className='text-black'>{profile?.bio}</p>
          </div>
          <div className='flex flex-row items-center gap-2 mt-4 text-black/50'>
            <IoCalendarOutline size={20} />
            <p>Joined {formatDate(profile?.created_at as any)}</p>
          </div>
        </div>
        <div className='flex flex-row items-center mt-4 gap-6 px-4'>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>{profile?.following_count}</p>
            <p className='text-black/50'>Following</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>{profile?.followed_count}</p>
            <p className='text-black/50'>Followed</p>
          </div>
        </div>
      </div>
    </>
  )
}
