import Avatar from 'src/components/Avatar'

export default function MessageItem() {
  return (
    <div className='flex items-start gap-2.5 mx-6 my-4'>
      <Avatar />
      <div className='flex flex-col gap-1 w-full max-w-[320px]'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm font-semibold text-gray-900 '>Bonnie Green</span>
          <span className='text-sm font-normal text-gray-500'>11:46</span>
        </div>
        <div className='flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl'>
          <p className='text-sm font-normal text-gray-900 '>
            {' '}
            That's awesome. I think our users will really appreciate the improvements.
          </p>
        </div>
        <span className='text-sm font-normal text-gray-500'>Delivered</span>
      </div>
      {/* <button
        id='dropdownMenuIconButton'
        data-dropdown-toggle='dropdownDots'
        data-dropdown-placement='bottom-start'
        className='inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none  focus:ring-gray-50'
        type='button'
      >
        <svg
          className='w-4 h-4 text-gray-500'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 4 15'
        >
          <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
        </svg>
      </button> */}
    </div>
  )
}