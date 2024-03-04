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
      <EditModal />
      <PostModal />
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
