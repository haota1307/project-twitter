import { Link } from 'react-router-dom'
import { googleApi } from 'src/apis/auth.api'

const getGoogleAuthURL = () => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: '748812675450-ouolfjf59ohvis3m4inkug0jn3rg7lmn.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:4000/users/oauth/google',
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    ),
    prompt: 'consent', // Nhắc người dùng đồng ý
    access_type: 'offline' // Lấy refresh token
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}

const googleOAuthUrl = getGoogleAuthURL()

export default function ButtonWithGG() {
  return (
    <>
      <div className='relative mt-4'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-white text-gray-500'>Or continue with</span>
        </div>
      </div>
      <Link
        to={googleOAuthUrl}
        className='w-full font-semibold mt-3 shadow-sm rounded-full py-2.5 bg-indigo-100 text-gray-800 flex items-center justify-center hover:opacity-85'
      >
        <div className='bg-white p-2 rounded-full'>
          <svg className='w-4' viewBox='0 0 533.5 544.3'>
            <path
              d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
              fill='#4285f4'
            />
            <path
              d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
              fill='#34a853'
            />
            <path
              d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
              fill='#fbbc04'
            />
            <path
              d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
              fill='#ea4335'
            />
          </svg>
        </div>
        <span className='ml-4'>Sign in with Google</span>
      </Link>
    </>
  )
}
