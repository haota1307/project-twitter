import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LoginModal from './modals/LoginModal'
import useRouteElements from './useRouteElements'
import RegisterModal from './modals/RegisterModal'
import LogoutModal from './modals/LogoutModal'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <LoginModal />
      <LogoutModal />
      <RegisterModal />
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
