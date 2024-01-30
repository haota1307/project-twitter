import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'

import Modal from 'src/components/Modal'
import config from 'src/constants/config'

import { AppContext } from 'src/contexts/app.context'
import useLogoutModal from 'src/hooks/useLogoutModal'
import { getRefreshTokenFromLs } from 'src/utils/auth'
import http from 'src/utils/http'

export default function LogoutModal() {
  const { setIsAuthenticated } = useContext(AppContext)
  const logoutModal = useLogoutModal()

  const onSubmitLogout = () => {
    http
      .post(
        '/users/logout',
        { refresh_token: getRefreshTokenFromLs() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: config.baseUrl
        }
      )
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        logoutModal.onClose()
        setIsAuthenticated(false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('profile')
      })
      .catch((err) => {
        console.log(err.response?.status)
      })
      .finally(() => {})
  }
  return (
    <Modal
      // disable={isLoading}
      isOpen={logoutModal.isOpen}
      title='Are you sure you want to sign out?'
      actionLabel='Logout'
      onClose={logoutModal.onClose}
      onSubmit={onSubmitLogout}
      cancelButton={true}
    />
  )
}
