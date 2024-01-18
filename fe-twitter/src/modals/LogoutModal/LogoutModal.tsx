import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'

import Modal from 'src/components/Modal'
import config from 'src/constants/config'

import { AppContext } from 'src/contexts/app.context'
import useLogoutModal from 'src/hooks/useLogoutModal'
import { getRefreshTokenFromLs } from 'src/utils/auth'

export default function LogoutModal() {
  const { setIsAuthenticated } = useContext(AppContext)
  const logoutModal = useLogoutModal()

  const onSubmitLogout = () => {
    axios
      .post(
        '/users/logout',
        { refresh_token: getRefreshTokenFromLs() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: config.baseUrl
          // signal: controller.signal
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
        console.log(err)
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
