import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  IoBookmarkOutline,
  IoBookmarkSharp,
  IoChatboxOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoHeartSharp
} from 'react-icons/io5'

import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'
import { MediaType, Tweet } from 'src/types/tweet.type'
import { formatDate } from 'src/utils/date'
import interactApi from 'src/apis/interact.api'
import { Link } from 'react-router-dom'
import { User } from 'src/types/user.type'
import useLoginModal from 'src/hooks/useLoginModal'

interface PostItemProps {
  data: Tweet
  user?: User
}

export default function PostItem({ data, user }: PostItemProps) {
  const { profile, isAuthenticated } = useContext(AppContext)
  const loginModal = useLoginModal()

  const [isLikedByUser, setIsLikedByUser] = useState(
    data?.likes?.some(async (like: any) => (await like.user_id) === profile?._id && isAuthenticated) || false
  )
  const [likesCount, setLikesCount] = useState(data?.likes?.length || 0)

  const [isBookmarkByUser, setIsBookmarkByUser] = useState(
    data?.bookmarks?.some(async (bookmark: any) => (await bookmark.user_id) === profile?._id && isAuthenticated) ||
      false
  )
  const [bookmarkCount, setBookmarkCount] = useState(data?.bookmarks?.length || 0)

  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      ;(videoRef.current as any).volume = 0.5
    }
  }, [])

  const isToggle = useCallback(() => {
    if (!isAuthenticated) {
      loginModal.onOpen()
      return
    }
  }, [isAuthenticated, loginModal])

  const handleLikeByUser = async (tweetId: string) => {
    if (!isAuthenticated) isToggle()
    if (isAuthenticated && tweetId)
      await interactApi
        .likeTweet(tweetId)
        .then(() => {
          setIsLikedByUser(true)
          setLikesCount((prevCount) => prevCount + 1)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const handleUnLikeByUser = async (tweetId: string) => {
    if (isAuthenticated && tweetId)
      await interactApi
        .unlikeTweet(tweetId)
        .then(() => {
          setIsLikedByUser(false)
          setLikesCount((prevCount) => prevCount - 1)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const handleBookmarkByUser = async (tweetId: string) => {
    if (!isAuthenticated) isToggle()
    if (isAuthenticated && tweetId)
      await interactApi
        .bookmarkTweet(tweetId)
        .then(() => {
          setIsBookmarkByUser(true)
          setBookmarkCount((prevCount) => prevCount + 1)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const handleUnBookmarkByUser = async (tweetId: string) => {
    if (isAuthenticated && tweetId)
      await interactApi
        .unbookmarkTweet(tweetId)
        .then(() => {
          setIsBookmarkByUser(false)
          setBookmarkCount((prevCount) => prevCount - 1)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const Content = () => (
    <>
      <div className='text-black whitespace-pre-line break-words py-2.5'>
        {data.content.split(' ').map((str, index) => {
          if (str.startsWith('#')) {
            return (
              <Link
                to={`/explore`}
                state={{ searchHashtag: str.substring(1) }}
                key={index}
                className='text-blue-500 font-bold italic hover:opacity-80'
              >
                {str}{' '}
              </Link>
            )
          }
          return str + ' '
        })}
      </div>
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
            className='block absolute top-0 left-0 w-full h-full bg-black rounded-2xl object-cover'
            src={data.medias[0]?.url}
            controls
            ref={videoRef}
          />
        </div>
      )}
    </>
  )

  return (
    <article className='border-b px-5 p-2'>
      <div className='flex flex-row max-w-full gap-4'>
        <Avatar url={user?.avatar || data?.user[0]?.avatar || data?.user?.avatar || profile?.avatar || ''} />
        <div>
          <div>
            <div className='flex flex-row items-center gap-2'>
              <p className='text-black font-semibold cursor-pointer hover:underline'>
                {data?.user?.name || user?.name || profile?.name}
              </p>
              <span className='text-neutral-500 text-sm'>{formatDate(data?.created_at)}</span>
            </div>
            {!isAuthenticated ? (
              <button onClick={isToggle}>
                <Content />
              </button>
            ) : (
              <Link to={`/tweets/${data?._id}`}>
                <Content />
              </Link>
            )}
          </div>
          <div className='flex flex-row justify-between items-center mt-3 gap-10'>
            {!isAuthenticated ? (
              <button
                onClick={isToggle}
                className='flex flex-row items-center gap-2 hover:text-sky-500 cursor-pointer hover:bg-sky-50 rounded-full p-2 transform active:scale-50 transition-transform'
              >
                <IoChatboxOutline size={20} />
                <p>{data?.comment?.length}</p>
              </button>
            ) : (
              <Link
                to={`/tweets/${data?._id}`}
                className='flex flex-row items-center gap-2 hover:text-sky-500 cursor-pointer hover:bg-sky-50 rounded-full p-2 transform active:scale-50 transition-transform'
              >
                <IoChatboxOutline size={20} />
                <p>{data?.comment?.length}</p>
              </Link>
            )}
            {isLikedByUser && isAuthenticated ? (
              <div
                className='flex flex-row items-center gap-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-full p-2 transform active:scale-50 transition-transform'
                onClick={() => handleUnLikeByUser(data._id as string)}
              >
                <IoHeartSharp size={20} color='ff2323' />
                <p className=' transition-opacity '>{likesCount}</p>
              </div>
            ) : (
              <button
                className='flex flex-row items-center gap-2 cursor-pointer text-neutral-500 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transform active:scale-50 transition-transform'
                onClick={() => handleLikeByUser(data._id as string)}
              >
                <IoHeartOutline size={20} />
                <p className=''>{likesCount}</p>
              </button>
            )}
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500'>
              <IoEyeOutline size={20} />
              <p>{data?.user_views}</p>
            </div>
            {isBookmarkByUser && isAuthenticated ? (
              <div
                onClick={() => handleUnBookmarkByUser(data._id as string)}
                className='flex flex-row items-center text-yellow-400 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-yellow-50 rounded-full p-2 transform active:scale-50 transition-transform'
              >
                <IoBookmarkSharp size={20} />
                <p>{bookmarkCount}</p>
              </div>
            ) : (
              <div
                onClick={() => handleBookmarkByUser(data._id as string)}
                className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-yellow-50 rounded-full p-2 transform active:scale-50 transition-transform'
              >
                <IoBookmarkOutline size={20} />
                <p>{bookmarkCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
