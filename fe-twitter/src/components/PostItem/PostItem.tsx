import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  IoBookmarkOutline,
  IoBookmarkSharp,
  IoChatboxOutline,
  IoCreateOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoHeartSharp,
  IoTrashOutline
} from 'react-icons/io5'

import Avatar from '../Avatar'
import { AppContext } from 'src/contexts/app.context'
import { MediaType, Tweet } from 'src/types/tweet.type'
import { formatDate } from 'src/utils/date'
import interactApi from 'src/apis/interact.api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useLoginModal from 'src/hooks/useLoginModal'
import useDeleteTweetModal from 'src/hooks/useDeleteTweet'
import useEditTweetModal from 'src/hooks/useEditTweet'

interface PostItemProps {
  data: Tweet
  user?: any
  option?: boolean
  isComment?: boolean
}

export default function PostItem({ data, user, option, isComment }: PostItemProps) {
  const { profile, isAuthenticated } = useContext(AppContext)
  const location = useLocation()
  const loginModal = useLoginModal()
  const deleteTweetModal = useDeleteTweetModal()
  const editTweetModal = useEditTweetModal()

  const [isLikedByUser, setIsLikedByUser] = useState(false)
  const [likesCount, setLikesCount] = useState(data?.likes?.length || 0)

  const [isBookmarkByUser, setIsBookmarkByUser] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(data?.bookmarks?.length || 0)

  const [tweetIdDelete] = useState(data._id)

  const videoRef = useRef(null)

  useEffect(() => {
    const checkIfLikedByUser = async () => {
      if (data?.likes && profile?._id && isAuthenticated) {
        console.log(data.likes)
        for (const like of data.likes) {
          const userId = location.pathname === '/bookmark' ? await (like as any)?._id : await (like as any)?.user_id
          if (userId === profile._id) {
            setIsLikedByUser(true)
            return
          }
        }
      }
      setIsLikedByUser(false)
    }

    const checkIfBookmarkedByUser = async () => {
      if (data?.bookmarks && profile?._id && isAuthenticated) {
        for (const bookmark of data.bookmarks) {
          const userId =
            location.pathname === '/bookmark' ? await (bookmark as any)?._id : await (bookmark as any)?.user_id
          if (userId === profile._id) {
            setIsBookmarkByUser(true)
            return
          }
        }
      }
      setIsBookmarkByUser(false)
    }

    checkIfLikedByUser()
    checkIfBookmarkedByUser()
  }, [data, profile, isAuthenticated])

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

  const Media = () => (
    <div className='w-[65%] my-4 mx-16'>
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
    </div>
  )

  const Content = () => {
    const navigate = useNavigate()
    const handleOnclick = (str: string) => {
      navigate('/explore', { state: { searchHashtag: str.substring(1) } })
    }
    return (
      <div className='text-black whitespace-pre-line break-words py-2.5'>
        {data.content.split(' ').map((str, index) => {
          if (str.startsWith('#')) {
            return (
              <button
                key={index}
                className='text-blue-500 font-bold italic hover:opacity-80'
                onClick={() => handleOnclick(str)}
              >
                {str}{' '}
              </button>
            )
          }
          return str + ' '
        })}
      </div>
    )
  }

  const handleDeleteTweet = () => {
    deleteTweetModal.setTweetId(tweetIdDelete as string)
    deleteTweetModal.onOpen()
  }

  const handleEditTweet = () => {
    editTweetModal.onOpen()
    editTweetModal.setTweetEdit(data)
  }

  return (
    <div className='border-b w-full'>
      <div className='px-6 p-2'>
        <div className='flex'>
          <Link to={profile?._id === data?.user?._id ? `/profile` : `/users/${data?.user?.username}`}>
            {isComment === true && <Avatar url={data?.user[0]?.avatar || ''} />}
            {!isComment === true && <Avatar url={user?.avatar || data?.user?.avatar || ''} />}
          </Link>
          <div className='w-full items-center ml-3'>
            <div className='flex items-center w-full justify-between'>
              <div className='flex items-center'>
                <p className='text-black font-semibold cursor-pointer hover:underline'>
                  {data?.user?.name || user?.name || profile?.name}
                </p>
                <span className='text-neutral-500 text-sm ml-2'>{formatDate(data?.created_at)}</span>
                {/* {data?.created_at !== data?.updated_at && <span className='text-neutral-500 text-sm ml-2'>Edited</span>} */}
              </div>
              {option && (
                <div className='flex justify-center items-center mr-1'>
                  <button className='mr-3' onClick={handleEditTweet}>
                    <IoCreateOutline />
                  </button>
                  <button onClick={handleDeleteTweet}>
                    <IoTrashOutline />
                  </button>
                </div>
              )}
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
        </div>
        <div>
          <div className='w-full'>
            {!isAuthenticated ? (
              <button onClick={isToggle}>
                <Media />
              </button>
            ) : (
              <Link to={`/tweets/${data?._id}`}>
                <Media />
              </Link>
            )}
          </div>
          <div className='flex flex-row justify-between items-center mt-3'>
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
    </div>
  )
}
