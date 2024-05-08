import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import authApi from 'src/apis/auth.api'
import Modal from 'src/components/Modal'
import { AppContext } from 'src/contexts/app.context'
import useLogoutModal from 'src/hooks/useLogoutModal'

export default function LogoutModal() {
  const { setIsAuthenticated } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const logoutModal = useLogoutModal()

  const onSubmitLogout = () => {
    setIsLoading(true)
    authApi
      .logout()
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        setIsAuthenticated(false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('profile')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        logoutModal.onClose()
        setIsLoading(false)
      })
  }
  return (
    <Modal
      disable={isLoading}
      isOpen={logoutModal.isOpen}
      title='Are you sure you want to sign out?'
      actionLabel='Logout'
      onClose={logoutModal.onClose}
      onSubmit={onSubmitLogout}
      cancelButton={true}
    />
  )
}
