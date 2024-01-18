import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

interface AvatarProps {
  isLarge?: boolean
  hasBorder?: boolean
}

const defaultAvatar =
  'https://img.freepik.com/premium-vector/art-illustration_890735-11.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais'

export default function Avatar({ isLarge, hasBorder }: AvatarProps) {
  const { profile } = useContext(AppContext)

  return (
    <>
      <div
        className={`
        ${hasBorder ? 'boder-4 border-black' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
      `}
      >
        <img src={profile?.avatar || defaultAvatar} alt='Avatar' className='object-cover rounded-full h-full w-full' />
      </div>
    </>
  )
}
