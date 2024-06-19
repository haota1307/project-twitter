import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Login from './pages/Login'
import { IoLogoTwitter } from 'react-icons/io5'
import AdminRoute from 'src/pages/Admin/Admin'
import AdminLayout from 'src/layouts/AdminLayout/AdminLayout'
import UserManagement from 'src/pages/Admin/UserManagement'
import TweetsManagement from 'src/pages/Admin/TweetsManagement'
import ConversationManagement from 'src/pages/Admin/ConversationManagement'

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
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'))

// Redirect
function RedirectRoute() {
  const { isAuthenticated } = useContext(AppContext) // Check login: đã đăng nhập(true)
  // Chưa đăng nhập thì chuyển sang trang home
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const LoadingPage = (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-cyan-200'>
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
            <Suspense fallback={LoadingPage}>
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
            <Suspense fallback={LoadingPage}>
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
          path: '/explore',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
                <Explore />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/messages',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
                <Message />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/messages/:user_name',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
                <Conversation />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
                <Profile />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/bookmark',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
                <Bookmark />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/following',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
                <HomeFollowing />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: '/email-verifications',
          element: (
            <MainLayout>
              <Suspense fallback={LoadingPage}>
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
        <Suspense fallback={LoadingPage}>
          <Login />
        </Suspense>
      )
    },
    {
      path: '/forgot-password',
      element: (
        <Suspense fallback={LoadingPage}>
          <VerifyForgotPasswordToken />
        </Suspense>
      )
    },
    {
      path: '/reset-password',
      element: (
        <Suspense fallback={LoadingPage}>
          <ResetPassword />
        </Suspense>
      )
    },
    {
      path: '/admin',
      element: <AdminRoute />,
      children: [
        {
          path: '/admin/home',
          element: (
            <Suspense fallback={LoadingPage}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/admin/users',
          element: (
            <Suspense fallback={LoadingPage}>
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/admin/tweets',
          element: (
            <Suspense fallback={LoadingPage}>
              <AdminLayout>
                <TweetsManagement />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/admin/conversations',
          element: (
            <Suspense fallback={LoadingPage}>
              <AdminLayout>
                <ConversationManagement />
              </AdminLayout>
            </Suspense>
          )
        }
      ]
    }
  ])
  return routeElements
}
