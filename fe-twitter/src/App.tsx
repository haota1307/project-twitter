import LoginModal from './modals/LoginModal'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <LoginModal />
      {routeElements}
    </>
  )
}

export default App
