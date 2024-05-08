import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userApi from 'src/apis/user.api'
import { AppContext } from 'src/contexts/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
import http from 'src/utils/http'

export default function VerifyEmail() {
  const { setProfile } = useContext(AppContext)
  const { token } = useQueryParams()
  const navigate = useNavigate()

  const [message, setMessage] = useState()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProfile = () => {
    userApi
      .getProfile()
      .then((res) => {
        setProfile(res.data.result[0])
        localStorage.setItem('profile', JSON.stringify(res.data.result[0]))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const controller = new AbortController()

    if (token) {
      http
        .post('/users/verify-email', { email_verify_token: token })
        .then((res) => {
          getProfile()
          setMessage(res.data.message)
          if (res.data.result) {
            const { refresh_token, access_token } = res.data.result
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)
          }
        })
        .catch((err) => {
          setMessage(err.response?.data?.message)
        })
        .finally(() => {
          setTimeout(() => {
            navigate('/')
          }, 5000)
        })
    }
    return () => {
      controller.abort()
    }
  }, [getProfile, navigate, token])

  return (
    <div className='flex justify-center h-full'>
      <div className='p-4 text-green-800 border border-green-300 bg-green-50 w-3/4 my-auto'>
        <div className='flex items-center'>
          <svg
            className='flex-shrink-0 w-4 h-4 me-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
          <h3 className='text-lg font-medium'>Notification</h3>
        </div>
        <div className='mt-2 mb-2 text-sm'>{message}</div>
        <div className='mt-2 mb-2 text-sm'>Automatically return to the home page after 5s</div>
      </div>
    </div>
  )
}
