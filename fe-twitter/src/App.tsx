import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LoginModal from './modals/LoginModal'
import useRouteElements from './useRouteElements'
import RegisterModal from './modals/RegisterModal'
import LogoutModal from './modals/LogoutModal'
import { useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.context'
import { LocalStorageEventTarget } from './utils/auth'
import EditModal from './modals/EditModal'
import PostModal from './modals/PostModal'
import ChangePasswordModal from './modals/ChangePasswordModal'
import ForgotPasswordModal from './modals/ForgotPasswordModal'
import DeleteTweetModal from './modals/DeleteTweetModal'
import ChangeUsernameModal from './modals/ChangeUsernameModal'
import EditTweetModal from './modals/EditTweetModal'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <LoginModal />
      <LogoutModal />
      <RegisterModal />
      <PostModal />
      <ChangePasswordModal />
      <ForgotPasswordModal />
      <EditModal />
      <DeleteTweetModal />
      <EditTweetModal />
      <ChangeUsernameModal />
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
