import { useContext } from 'react'
import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'
import { IoChatboxOutline, IoLinkOutline } from 'react-icons/io5'
import { Media, MediaType, Tweet } from 'src/types/tweet.type'
import { formatDate } from 'src/utils/date'

interface PostItemProps {
  key: any
  data: Tweet
}

export default function PostItem({ data, key }: PostItemProps) {
  const { profile } = useContext(AppContext)

  return (
    <div
      key={key}
      className='
    border-b 
    p-5 
    cursor-pointer 
    hover:bg-slate-50 
    transition
  '
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              className='
            text-black 
            font-semibold 
            cursor-pointer 
            hover:underline
        '
            >
              {profile?.name}
            </p>
            <span
              className='
            text-neutral-500
            cursor-pointer
            hover:underline
            hidden
            md:block
        '
            >
              @{data.user_id}
            </span>
            <span className='text-neutral-500 text-sm'>{formatDate(data.created_at)}</span>
          </div>
          <div className='text-black mt-1'>{data?.content || ' '}</div>
          <div className='bg-slate-100 h-80 mt-2 flex'>
            {data.medias[0]?.type === MediaType.Image && (
              <img className='object-cover h-80 w-full' src={data.medias[0]?.url}></img>
            )}

            {data.medias[0]?.type === MediaType.Video && (
              <video className='h-80 w-full' src={data.medias[0]?.url}></video>
            )}
          </div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div
              className='
            flex 
            flex-row 
            items-center 
            text-neutral-500 
            gap-2 
            cursor-pointer 
            transition 
            hover:text-sky-500
        '
            >
              <IoChatboxOutline size={20} />
              <p>10</p>
            </div>
            <div
              className='
            flex 
            flex-row 
            items-center 
            text-neutral-500 
            gap-2 
            cursor-pointer 
            transition 
            hover:text-red-500
        '
            >
              <IoLinkOutline color='red' size={20} />
              <p>111</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
