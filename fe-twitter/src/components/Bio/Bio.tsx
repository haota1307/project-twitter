import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from '../Button'
import { IoCalendarOutline } from 'react-icons/io5'
import { formatDate } from 'src/utils/date'
import useEditModal from 'src/hooks/useEditModal'
import { useLocation } from 'react-router-dom'
import { User } from 'src/types/user.type'

interface BioProps {
  userId: string
}

export default function Bio({ data }: User | any) {
  const { profile } = useContext(AppContext)

  const location = useLocation()
  const isMyProfilePage = location.pathname === '/profile'

  const editModal = useEditModal()
  return (
    <>
      <div className='border-b pb-4'>
        <div className='flex justify-end p-2'>
          {isMyProfilePage ? (
            <Button secondary label='Edit' onClick={editModal.onOpen} />
          ) : (
            <Button secondary label='Follow' onClick={() => console.log('Chưa làm')} />
          )}
        </div>
        <div className='mt-8 px-4'>
          <div className='flex flex-col'>
            <p className='text-black text-2xl font-semibold'>{isMyProfilePage ? profile?.name : data?.name}</p>
            <p className='text-black/50 text-md'>@{isMyProfilePage ? profile?.username : data?.username}</p>
          </div>
          {(profile?.bio === '' && isMyProfilePage) || (data?.bio === '' && isMyProfilePage) ? (
            <div className='flex flex-col mt-4'>
              <p className='text-black'>{isMyProfilePage ? profile?.bio : data?.bio} aa</p>
            </div>
          ) : (
            <div className='flex flex-col mt-4'>
              <p className='text-black'>Have a nice day 💕💕</p>
            </div>
          )}
          {/* <div className='flex flex-col mt-4'>
            <p className='text-black'>{isMyProfilePage ? profile?.bio : data?.bio}</p>
          </div> */}
          <div className='flex flex-row items-center gap-2 mt-4 text-black/50'>
            <IoCalendarOutline size={20} />
            <p>
              Joined {isMyProfilePage ? formatDate(profile?.created_at as any) : formatDate(data?.created_at as any)}
            </p>
          </div>
        </div>
        <div className='flex flex-row items-center mt-4 gap-6 px-4'>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>{isMyProfilePage ? profile?.following_count : data?.following_count}</p>
            <p className='text-black/50'>Following</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>{isMyProfilePage ? profile?.followed_count : data?.followed_count}</p>
            <p className='text-black/50'>Followed</p>
          </div>
        </div>
      </div>
    </>
  )
}
