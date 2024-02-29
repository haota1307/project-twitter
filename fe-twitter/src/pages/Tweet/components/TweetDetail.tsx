import React, { useContext, useEffect, useRef } from 'react'
import { IoChatboxOutline } from 'react-icons/io5'
import Avatar from 'src/components/Avatar'
import { AppContext } from 'src/contexts/app.context'
import { MediaType, Tweet } from 'src/types/tweet.type'
import { formatDate } from 'src/utils/date'

interface PostItemProps {
  data: Tweet
}

export default function TweetDetail({ data }: PostItemProps) {
  const { profile } = useContext(AppContext)
  const videoRef = useRef(null)

  const isMyTweet = data?.user_id === profile?._id

  useEffect(() => {
    if (videoRef.current) {
      ;(videoRef.current as any).volume = 0.5
    }
  }, [])

  return (
    <div className='border-b px-5 py-6'>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-row gap-4'>
          {isMyTweet ? <Avatar isMyProfile /> : <Avatar url={data?.users[0].user[0].avatar} />}
        </div>
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
                className='block absolute top-0 left-0 bg-white w-full h-full object-cover rounded-2xl'
                src={data.medias[0]?.url}
              ></img>
            </div>
          )}
          {data?.medias[0]?.type === MediaType.Video && (
            <div className='w-full pt-[100%] relative'>
              <video
                className='absolute top-0 left-0 w-full h-full bg-black rounded-2xl'
                src={data.medias[0]?.url}
                controls
                ref={videoRef}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
