import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'

interface AvatarProps {
  isLarge?: boolean
  hasBorder?: boolean
  url?: string
}

const defaultAvatar =
  'https://img.freepik.com/premium-vector/art-illustration_890735-11.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais'

export default function Avatar({ isLarge, hasBorder, url }: AvatarProps) {
  const { profile } = useContext(AppContext)

  return (
    <>
      <div
        className={`
        ${hasBorder ? 'boder-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        flex-shrink-0
        relative
      `}
      >
        <div className='w-full pt-[100%] relative'>
          <img
            src={url || defaultAvatar}
            alt='Avatar'
            className='block object-cover rounded-full h-full w-full absolute top-0 left-0'
          />
        </div>
      </div>
    </>
  )
}
