import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from '../Button'
import {
  IoCalendarOutline,
  IoChatbubbleEllipsesOutline,
  IoCreateOutline,
  IoEarthOutline,
  IoLocationOutline
} from 'react-icons/io5'
import { formatDate } from 'src/utils/date'
import useEditModal from 'src/hooks/useEditModal'
import { Link, useLocation } from 'react-router-dom'
import { User } from 'src/types/user.type'
import Popover from '../Popover'
import http from 'src/utils/http'
import { toast } from 'react-toastify'
import useChangePasswordModal from 'src/hooks/useChangePasswordModal'
import userApi from 'src/apis/user.api'
import config from 'src/constants/config'
import useLoginModal from 'src/hooks/useLoginModal'
import useChangeUsernameModal from 'src/hooks/useChangeUsernameModal'

export default function Bio({ data }: User | any) {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [me, setMe] = useState<User>()
  const [disabled, setDisabled] = useState(false)
  const [isFollow, setIsFollow] = useState(false)

  const websiteUrl = profile?.website || data?.website

  const fullUrl =
    websiteUrl?.startsWith('http://') || websiteUrl?.startsWith('https://') ? websiteUrl : `http://${websiteUrl}`

  const location = useLocation()
  const isMyProfilePage = location.pathname === '/profile'

  const editModal = useEditModal()
  const changePasswordModal = useChangePasswordModal()
  const changeUsernameModal = useChangeUsernameModal()

  const handleDisabled = () => {
    // Disable the button
    setDisabled(true)

    // Enable the button after 60 seconds
    setTimeout(() => {
      setDisabled(false)
    }, 60000) // 60 seconds
  }

  useEffect(() => {
    if (isAuthenticated) {
      userApi.getProfile().then((res) => {
        setMe(res.data.result[0])
      })
    }
  }, [])

  useEffect(() => {
    const checkIfFollowByUser = async () => {
      if (me?.following && profile?._id && isAuthenticated) {
        for (const item of me.following) {
          const userId = await (item as any)?._id
          console.log(userId)
          if (userId === data?._id) {
            setIsFollow(true)
            return
          }
        }
      }
      setIsFollow(false)
    }

    checkIfFollowByUser()
  }, [data?._id, me])

  const handleForgotPassword = () => {
    userApi
      .forgotPassword({ email: me?.email || '' })
      .then((data) => {
        toast.success(data.data.message, {
          position: 'top-right',
          autoClose: 2000
        })
        handleDisabled()
      })
      .catch((err) => {
        toast.error(err.data.message, {
          position: 'top-right',
          autoClose: 2000
        })
      })
  }

  const handleFollowByUser = () => {
    setDisabled(true)
    http
      .post(
        'users/follow',
        { followed_user_id: data._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: config.baseUrl
        }
      )
      .then(() => {
        toast.success('Follow successful!', {
          autoClose: 2000,
          closeButton: true
        })
        setIsFollow(true)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setDisabled(false)
      })
  }

  const handleUnfollowByUser = () => {
    setDisabled(true)
    http
      .delete(`users/follow/${data._id}`)
      .then(() => {
        toast.success('Unfollow successful!', {
          autoClose: 2000,
          closeButton: true
        })
        setIsFollow(false)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setDisabled(false)
      })
  }

  const toggleChangePasswordModal = () => {
    if (changePasswordModal.isOpen) {
      return
    }
    changePasswordModal.onOpen()
  }

  const loginModal = useLoginModal()
  const isToggle = useCallback(() => {
    if (isAuthenticated) {
      return
    }
    loginModal.onOpen()
  }, [isAuthenticated, loginModal])

  const itemPopover = [
    {
      name: 'Change password',
      onClick: toggleChangePasswordModal
    },
    {
      name: 'Forgot password',
      onClick: handleForgotPassword,
      disabled: disabled
    }
  ]

  return (
    <div className='border-b pb-4'>
      <div className='flex justify-end p-2 items-center gap-4'>
        {isMyProfilePage && <Popover item={itemPopover} />}
        {isMyProfilePage && <Button secondary label='Edit' onClick={editModal.onOpen} />}
        {!isMyProfilePage && (
          <button className='p-2 hover:bg-blue-100 rounded-full'>
            <Link to={`/messages/${data?.username}`} key={data?._id}>
              <IoChatbubbleEllipsesOutline size={30} color='#3B82F6' />
            </Link>
          </button>
        )}
        {!isMyProfilePage && !isFollow && (
          <Button
            label='Follow'
            secondary
            onClick={isAuthenticated ? handleFollowByUser : isToggle}
            disabled={disabled}
          />
        )}
        {!isMyProfilePage && isFollow && (
          <Button
            label='Following'
            secondary
            onClick={isAuthenticated ? handleUnfollowByUser : isToggle}
            disabled={disabled}
          />
        )}
      </div>
      <div className='mt-4 px-4'>
        <div className='flex flex-col'>
          <p className='text-black text-2xl font-semibold'>{isMyProfilePage ? profile?.name : data?.name}</p>
          <div className='flex items-center'>
            <p className='text-black/50 text-md mr-2'>@{isMyProfilePage ? profile?.username : data?.username}</p>
            {isMyProfilePage && (
              <button
                className='hover:bg-slate-200 rounded-full hover:p-1'
                onClick={() => changeUsernameModal.onOpen()}
              >
                <IoCreateOutline />
              </button>
            )}
          </div>
        </div>
        {(me?.bio !== '' && isMyProfilePage) || (data?.bio !== '' && !isMyProfilePage) ? (
          <div className='flex flex-col mt-2.5'>
            <p className='text-black'>{isMyProfilePage ? profile?.bio : data?.bio}</p>
          </div>
        ) : (
          ''
        )}
        <div className='flex items-center'>
          <div className='flex flex-row items-center gap-2 mt-2.5 text-black/50 mr-4'>
            <IoCalendarOutline size={20} />
            <p>
              Joined {isMyProfilePage ? formatDate(profile?.created_at as any) : formatDate(data?.created_at as any)}
            </p>
          </div>
          <div className='flex flex-row items-center gap-2 mt-2.5 text-black/50'>
            <IoCalendarOutline size={20} />
            <p>
              Birthday{' '}
              {isMyProfilePage ? formatDate(profile?.date_of_birth as any) : formatDate(data?.date_of_birth as any)}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          {((profile?.location && isMyProfilePage) || data?.location) && (
            <div className='flex flex-row items-center gap-2 mt-2.5 text-black/50 mr-4 truncate max-w-72'>
              <IoLocationOutline size={20} />
              <p className='truncate'>{isMyProfilePage ? profile?.location : data?.location}</p>
            </div>
          )}
          {((profile?.website && isMyProfilePage) || data?.website) && (
            <div className='flex flex-row items-center gap-2 mt-2.5 text-black/50 truncate max-w-72'>
              <IoEarthOutline size={20} />
              <a href={fullUrl} target='_blank' rel='noopener noreferrer' className='truncate'>
                <p className='text-blue-700 underline truncate'>{isMyProfilePage ? profile?.website : data?.website}</p>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-row items-center mt-2.5 gap-6 px-4'>
        <div className='flex flex-row items-center gap-1'>
          <p className='text-black'>{isMyProfilePage ? me?.following?.length : data?.following_count}</p>
          <p className='text-black/50'>Following</p>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <p className='text-black'>{isMyProfilePage ? me?.followed?.length : data?.followed_count}</p>
          <p className='text-black/50'>Followed</p>
        </div>
      </div>
    </div>
  )
}
