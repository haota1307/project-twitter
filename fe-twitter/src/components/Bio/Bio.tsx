import { useContext, useMemo } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from '../Button'
import { IoCalendarOutline } from 'react-icons/io5'
import { formatDate } from 'src/utils/date'

interface BioProps {
  userId: string
}

export default function Bio() {
  const { profile } = useContext(AppContext)

  const currentUser = profile?._id
  const userId = '6584444369db58eebf0afbf3' //test

  // const createdAt = useMemo(() => {
  //   if (!currentUser) {
  //     return null
  //   }
  //   return 'New user'
  // }, [currentUser])

  return (
    <>
      <div className='border-b pb-4'>
        <div className='flex justify-end p-2'>
          {currentUser === userId ? (
            <Button secondary label='Edit' onClick={() => {}} />
          ) : (
            <Button secondary label='Follow' onClick={() => {}} />
          )}
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
            <p className='text-black'>9999</p>
            <p className='text-black/50'>Following</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>9999</p>
            <p className='text-black/50'>Followed</p>
          </div>
        </div>
      </div>
    </>
  )
}
