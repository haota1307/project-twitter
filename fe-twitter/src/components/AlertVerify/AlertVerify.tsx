import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AlertVerify() {
  const [resendDisabled, setResendDisabled] = useState(false)

  const handleResendClick = () => {
    // Disable the button
    setResendDisabled(true)

    // Enable the button after 60 seconds
    setTimeout(() => {
      setResendDisabled(false)
    }, 60000) // 60 seconds
  }

  return (
    <>
      <div className='p-4 mb-4 text-blue-800 border border-blue-300 bg-blue-50'>
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
        <div className='mt-2 mb-2 text-sm'>
          Your account is not verified, please verify now for a better experience.
        </div>
        <div className='mt-1 mb-4 text-xs opacity-50'>If you don't see the email, please click "Resend".</div>
        <div className='flex'>
          <Link
            target='_blank'
            to={'https://mail.google.com/mail/u/0/#inbox'}
            className='text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center'
          >
            Go to Email
          </Link>
          <button
            onClick={handleResendClick}
            disabled={resendDisabled}
            className={`text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center ${
              resendDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Resend
          </button>
        </div>
      </div>
    </>
  )
}
