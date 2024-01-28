import { useContext, useEffect, useRef } from 'react'
import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'
import { IoBookmarkOutline, IoChatboxOutline, IoEyeOutline, IoHeartOutline } from 'react-icons/io5'
import { Media, MediaType, Tweet } from 'src/types/tweet.type'
import { formatDate } from 'src/utils/date'

interface PostItemProps {
  data: Tweet
}

export default function PostItem({ data }: PostItemProps) {
  const { profile } = useContext(AppContext)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      ;(videoRef.current as any).volume = 0.5
    }
  }, [])

  return (
    <div className='border-b p-5 cursor-pointer hover:bg-slate-50 transition'>
      <div className='flex flex-row items-start gap-3'>
        <Avatar />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p className='text-black font-semibold cursor-pointer hover:underline'>{profile?.name}</p>
            <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data?.user_id}</span>
            <span className='text-neutral-500 text-sm'>{formatDate(data?.created_at)}</span>
          </div>
          <div className='text-black my-2'>{data?.content || ' '}</div>
          {data?.medias[0]?.type === MediaType.Image && (
            <div className='w-full pt-[100%] relative'>
              <img
                className='absolute top-0 left-0 bg-white w-full h-full object-cover rounded-2xl'
                src={data.medias[0]?.url}
              ></img>
            </div>
          )}
          {data?.medias[0]?.type === MediaType.Video && (
            <div className='w-full pt-[100%] relative'>
              <video
                className='absolute top-0 left-0 bg-white w-full h-full object-cover rounded-2xl'
                src={data.medias[0]?.url}
                controls
                ref={videoRef}
              ></video>
            </div>
          )}
          <div className='flex flex-row justify-between items-center mt-3 gap-10'>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <IoChatboxOutline size={20} />
              <p>{data?.comment?.length}</p>
            </div>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'>
              <IoHeartOutline size={20} />
              <p>{data?.likes?.length || 0}</p>
            </div>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500'>
              <IoEyeOutline size={20} />
              <p>{data.user_views}</p>
            </div>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-500'>
              <IoBookmarkOutline size={20} />
              <p>{data?.bookmark?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
