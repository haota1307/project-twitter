import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Login from './pages/Login'

const Home = lazy(() => import('./pages/Home'))
const Explore = lazy(() => import('./pages/Explore'))
const Message = lazy(() => import('./pages/Message'))
const Profile = lazy(() => import('./pages/Profile'))
const Bookmark = lazy(() => import('./pages/Bookmark'))
const HomeFollowing = lazy(() => import('./pages/HomeFollowing'))
const Tweet = lazy(() => import('./pages/Tweet'))
const Users = lazy(() => import('./pages/Users'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))

//redirect
function RedirectRoute() {
  const { isAuthenticated } = useContext(AppContext) // Check login: đã đăng nhập(true)
  // Chưa đăng nhập thì chuyển sang trang đăng nhập
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
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
      path: 'tweets',
      element: <MainLayout />,
      children: [
        {
          path: ':tweet_id',
          element: (
            <Suspense fallback={<div>Loading</div>}>
              <Tweet />
            </Suspense>
          )
        }
      ]
    },
    {
      path: 'users',
      element: <MainLayout />,
      children: [
        {
          path: ':user_name',
          element: (
            <Suspense fallback={<div>Loading</div>}>
              <Users />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <RedirectRoute />,
      children: [
        {
          path: '/Explore',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading</div>}>
                <Explore />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Messages',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading</div>}>
                <Message />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Profile',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading</div>}>
                <Profile />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Bookmark',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading</div>}>
                <Bookmark />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Following',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading</div>}>
                <HomeFollowing />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/email-verifications',
          element: (
            <MainLayout>
              <Suspense fallback={<div>Loading</div>}>
                <VerifyEmail />
              </Suspense>
            </MainLayout>
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
  ])
  return routeElements
}
