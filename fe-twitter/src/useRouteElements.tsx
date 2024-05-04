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
const Conversation = lazy(() => import('./pages/Message/Page/Conversation'))

//redirect
function RedirectRoute() {
  const { isAuthenticated } = useContext(AppContext) // Check login: đã đăng nhập(true)
  // Chưa đăng nhập thì chuyển sang trang home
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const LoadingPage = (
    <div className='w-full h-screen flex justify-center items-center  bg-gradient-to-r from-blue-200 to-cyan-200'>
      <div className='animate-pulse flex justify-center items-center'>
        <IoLogoTwitter size={80} color='#fff' />
      </div>
    </div>
  )
  const routeElements = useRoutes([
    {
      path: '',
      children: [
        {
          index: true,
          path: '/',
          element: (
            <Suspense fallback={LoadingPage}>
              <MainLayout>
                <Home />
              </MainLayout>
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
            <Suspense>
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
            <Suspense>
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
              <Suspense>
                <Explore />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Messages',
          element: (
            <MainLayout>
              <Suspense>
                <Message />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Messages/:user_name',
          element: (
            <MainLayout>
              <Suspense>
                <Conversation />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Profile',
          element: (
            <MainLayout>
              <Suspense>
                <Profile />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Bookmark',
          element: (
            <MainLayout>
              <Suspense>
                <Bookmark />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/Following',
          element: (
            <MainLayout>
              <Suspense>
                <HomeFollowing />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/email-verifications',
          element: (
            <MainLayout>
              <Suspense>
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
        <Suspense>
          <Login />
        </Suspense>
      )
    },
    {
      path: '/forgot-password',
      element: (
        <Suspense>
          <VerifyForgotPasswordToken />
        </Suspense>
      )
    },
    {
      path: '/reset-password',
      element: (
        <Suspense>
          <ResetPassword />
        </Suspense>
      )
    }
  ])
  return routeElements
}
