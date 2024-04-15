import { useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from '../Button'
import { IoCalendarOutline } from 'react-icons/io5'
import { formatDate } from 'src/utils/date'
import useEditModal from 'src/hooks/useEditModal'
import { useLocation } from 'react-router-dom'
import { User } from 'src/types/user.type'
import Popover from '../Popover'
import http from 'src/utils/http'
import { toast } from 'react-toastify'
import useChangePasswordModal from 'src/hooks/useChangePasswordModal'
import userApi from 'src/apis/user.api'

export default function Bio({ data }: User | any) {
  const { profile } = useContext(AppContext)
  const [disabled, setDisabled] = useState(false)

  const location = useLocation()
  const isMyProfilePage = location.pathname === '/profile'

  const editModal = useEditModal()
  const changePasswordModal = useChangePasswordModal()

  const handleDisabled = () => {
    // Disable the button
    setDisabled(true)

    // Enable the button after 60 seconds
    setTimeout(() => {
      setDisabled(false)
    }, 60000) // 60 seconds
  }

  const handleForgotPassword = () => {
    userApi
      .forgotPassword({ email: profile?.email || '' })
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

  const toggleChangePasswordModal = () => {
    if (changePasswordModal.isOpen) {
      return
    }
    changePasswordModal.onOpen()
  }

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
    <>
      <div className='border-b pb-4'>
        <div className='flex justify-end p-2 items-center gap-4'>
          {isMyProfilePage && <Popover item={itemPopover} />}
          {isMyProfilePage ? (
            <Button secondary label='Edit' onClick={editModal.onOpen} />
          ) : (
            <Button secondary label='Follow' onClick={() => console.log('Chưa làm')} />
          )}
        </div>
        <div className='mt-8 px-4'>
          <div className='flex flex-col'>
            <p className='text-black text-2xl font-semibold'>{isMyProfilePage ? profile?.name : data?.name}</p>
            <p className='text-black/50 text-md'>@{isMyProfilePage ? profile?.username : data?.username}</p>
          </div>
          {(profile?.bio !== '' && isMyProfilePage) || (data?.bio !== '' && !isMyProfilePage) ? (
            <div className='flex flex-col mt-2.5'>
              <p className='text-black'>{isMyProfilePage ? profile?.bio : data?.bio}</p>
            </div>
          ) : (
            <div className='flex flex-col mt-2.5'>
              <p className='text-black'>Have a nice day 💕💕</p>
            </div>
          )}
          <div className='flex flex-row items-center gap-2 mt-2.5 text-black/50'>
            <IoCalendarOutline size={20} />
            <p>
              Birthday{' '}
              {isMyProfilePage ? formatDate(profile?.date_of_birth as any) : formatDate(data?.date_of_birth as any)}
            </p>
          </div>
          <div className='flex flex-row items-center gap-2 mt-2.5 text-black/50'>
            <IoCalendarOutline size={20} />
            <p>
              Joined {isMyProfilePage ? formatDate(profile?.created_at as any) : formatDate(data?.created_at as any)}
            </p>
          </div>
        </div>
        <div className='flex flex-row items-center mt-2.5 gap-6 px-4'>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>{isMyProfilePage ? profile?.following?.length : data?.following_count}</p>
            <p className='text-black/50'>Following</p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-black'>{isMyProfilePage ? profile?.followed?.length : data?.followed_count}</p>
            <p className='text-black/50'>Followed</p>
          </div>
        </div>
      </div>
    </>
  )
}
