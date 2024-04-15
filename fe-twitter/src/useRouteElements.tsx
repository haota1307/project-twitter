import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Login from './pages/Login'
import { IoLogoTwitter } from 'react-icons/io5'

const Home = lazy(() => import('./pages/Home'))
const Explore = lazy(() => import('./pages/Explore'))
const Message = lazy(() => import('./pages/Message'))
const Profile = lazy(() => import('./pages/Profile'))
const Bookmark = lazy(() => import('./pages/Bookmark'))
const HomeFollowing = lazy(() => import('./pages/HomeFollowing'))
const Tweet = lazy(() => import('./pages/Tweet'))
const Users = lazy(() => import('./pages/Users'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const VerifyForgotPasswordToken = lazy(() => import('./pages/VerifyForgotPasswordToken'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

//redirect
function RedirectRoute() {
  const { isAuthenticated } = useContext(AppContext) // Check login: đã đăng nhập(true)
  // Chưa đăng nhập thì chuyển sang trang đăng nhập
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const Loading = (
    <div className='w-full h-screen flex justify-center items-center  bg-gradient-to-bl from-blue-50 via-sky-300 to-sky-400'>
      <div className='animate-pulse flex justify-center items-center'>
        <IoLogoTwitter size={80} color='#fff' />
      </div>
    </div>
  )

  const routeElements = useRoutes([
    {
      path: '',
      element: (
        <Suspense fallback={Loading}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: '/',
          element: <Home />
        }
      ]
    },
    {
      path: 'tweets',
      element: <MainLayout />,
      children: [
        {
          path: ':tweet_id',
          element: <Tweet />
        }
      ]
    },
    {
      path: 'users',
      element: <MainLayout />,
      children: [
        {
          path: ':user_name',
          element: <Users />
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
            <Suspense fallback={Loading}>
              <MainLayout>
                <Explore />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: '/Messages',
          element: (
            <Suspense fallback={Loading}>
              <MainLayout>
                <Message />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: '/Profile',
          element: (
            <Suspense fallback={Loading}>
              <MainLayout>
                <Profile />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: '/Bookmark',
          element: (
            <Suspense fallback={Loading}>
              <MainLayout>
                <Bookmark />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: '/Following',
          element: (
            <Suspense fallback={Loading}>
              <MainLayout>
                <HomeFollowing />
              </MainLayout>
            </Suspense>
          )
        },
        {
          path: '/email-verifications',
          element: (
            <Suspense fallback={Loading}>
              <MainLayout>
                <VerifyEmail />
              </MainLayout>
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/login/oauth',
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      )
    },
    {
      path: '/forgot-password',
      element: (
        <Suspense fallback={Loading}>
          <VerifyForgotPasswordToken />
        </Suspense>
      )
    },
    {
      path: '/reset-password',
      element: (
        <Suspense fallback={Loading}>
          <ResetPassword />
        </Suspense>
      )
    }
  ])
  return routeElements
}
