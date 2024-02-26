import { useContext, useState } from 'react'
import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'
import { useLocation } from 'react-router-dom'

export default function BackGround({ data }: any) {
  const { profile } = useContext(AppContext)
  const location = useLocation()
  const isMyProfilePage = location.pathname === '/profile'

  return (
    <>
      {isMyProfilePage ? (
        <div className='bg-slate-200 h-52 relative'>
          {profile?.cover_photo && (
            <img src={profile?.cover_photo} alt='Back ground cover' className='object-cover h-full w-full' />
          )}
          <div className='absolute -bottom-16 left-4'>
            <Avatar isLarge hasBorder url={profile?.avatar} isMyProfile />
          </div>
        </div>
      ) : (
        <div className='bg-slate-200 h-52 relative'>
          {data?.cover_photo && (
            <img src={profile?.cover_photo} alt='Back ground cover' className='object-cover h-full w-full' />
          )}
          <div className='absolute -bottom-16 left-4'>
            <Avatar isLarge hasBorder url={data?.avatar} />
          </div>
        </div>
      )}
    </>
  )
}
