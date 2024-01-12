import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { Suspense, lazy } from 'react'
// import Home from './pages/Home'

const Home = lazy(() => import('./pages/Home'))

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          index: true,
          path: '/',
          element: (
            <Suspense fallback={<div>Loading</div>}>
              <Home />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routeElements
}
