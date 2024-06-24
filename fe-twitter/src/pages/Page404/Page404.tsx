import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { formatDate, formatTime } from 'src/utils/date'

export default function Page404() {
  const { profile, setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitLogout = () => {
    authApi
      .logout()
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        setIsAuthenticated(false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('profile')
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className='bg-white dark:bg-gray-900 h-screen flex justify-center items-center'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-5xl tracking-tight font-extrabold lg:text-5xl text-primary-600 dark:text-primary-500'>
            You have been banned
          </h1>
          {profile?.ban_info && (
            <div>
              <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>
                {formatTime(profile?.ban_info?.ban_start_date as any)}{' '}
                {formatDate(profile?.ban_info?.ban_start_date as any)} -{' '}
                {formatTime(profile?.ban_info?.ban_end_date as any)}{' '}
                {formatDate(profile?.ban_info?.ban_end_date as any)}
              </p>
              <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
                {profile?.ban_info?.ban_reason || 'You may be banned for violating community rules'}
              </p>
            </div>
          )}
          <button
            className='border border-slate-500 bg-white px-3.5 py-3 rounded-2xl hover:bg-white/80 font-semibold'
            onClick={onSubmitLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  )
}
