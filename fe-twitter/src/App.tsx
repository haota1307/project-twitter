import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LoginModal from './modals/LoginModal'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <LoginModal />
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
