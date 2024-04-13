import { useContext } from 'react'
import { IoCreateOutline } from 'react-icons/io5'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'

interface AvatarProps {
  isLarge?: boolean
  hasBorder?: boolean
  url?: string
  isMyProfile?: boolean
  edit?: boolean
}

const defaultAvatar =
  'https://img.freepik.com/premium-vector/art-illustration_890735-11.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais'

export default function Avatar({ isLarge, hasBorder, url, isMyProfile, edit }: AvatarProps) {
  const { profile } = useContext(AppContext)

  return (
    <>
      <div
        className={`
        ${hasBorder ? 'boder-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full
        transition
        flex-shrink-0
        relative
      `}
      >
        <div className='w-full pt-[100%] relative'>
          {isMyProfile ? (
            <img
              src={profile?.avatar || defaultAvatar}
              alt='Avatar'
              className='block object-cover rounded-full h-full w-full absolute top-0 left-0 border-2 cursor-pointer'
            />
          ) : (
            <img
              src={url || defaultAvatar}
              alt='Avatar'
              className='block object-cover rounded-full h-full w-full absolute top-0 left-0 border-2 cursor-pointer'
            />
          )}
          {edit && (
            <button
              className='absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.25rem] rounded-full bg-gray-50 hover:opacity-90 border cursor-pointer'
              title='Change avatar'
            >
              <IoCreateOutline />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
