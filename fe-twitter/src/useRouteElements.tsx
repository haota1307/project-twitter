import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Login from './pages/Login'
// import Home from './pages/Home'

const Home = lazy(() => import('./pages/Home'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext) // Check login: đã đăng nhập(true)
  // Chưa đăng nhập thì chuyển sang trang đăng nhập
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

// Chưa đăng nhập
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext) // Check login: đã đăng nhập(true)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

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
    },
    {
      path: '/login/oauth',
      element: (
        <Suspense fallback={<div>Loading</div>}>
          <Login />
        </Suspense>
      )
    }
    // {
    //   path: '',
    //   element: <RejectedRoute />,
    //   children: [
    //     {
    //       path: '',
    //       element: <Registerlayout />,
    //       children: [
    //         {
    //           path: path.login,
    //           element: (
    //             <Suspense fallback={<div>Loading</div>}>
    //               <Login />
    //             </Suspense>
    //           )
    //         },
    //         {
    //           path: path.register,
    //           element: (
    //             <Suspense fallback={<div>Loading</div>}>
    //               <Register />
    //             </Suspense>
    //           )
    //         }
    //       ]
    //     }
    //   ]
    // }
  ])
  return routeElements
}
