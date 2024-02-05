import { useContext } from 'react'
import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'

export default function BackGround() {
  const { profile } = useContext(AppContext)
  return (
    <>
      <div className='bg-slate-200 h-52 relative'>
        {profile?.cover_photo && (
          <img src={profile?.cover_photo} alt='Back ground cover' className='object-cover h-full w-full' />
        )}
        <div className='absolute -bottom-16 left-4'>
          <Avatar isLarge hasBorder url={profile?.avatar} />
        </div>
      </div>
    </>
  )
}
