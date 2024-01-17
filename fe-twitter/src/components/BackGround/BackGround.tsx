import Avatar from '../Avatar'

interface BackGroundProps {
  userId: string
  srcBGC: string
}
export default function BackGround({ userId, srcBGC }: BackGroundProps) {
  return (
    <>
      <div className='bg-slate-200 h-44 relative'>
        {srcBGC && <img src='' alt='Back ground cover' className='object-cover' />}
        <div className='absolute -bottom-16 left-4'>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </>
  )
}
