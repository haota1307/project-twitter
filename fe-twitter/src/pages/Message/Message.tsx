import React from 'react'

export default function Message() {
  return (
    <div>
      <div className='flex justify-center items-center w-full h-screen'>
        <div className='border-gray-300 shadow text-gray-100 mx-auto flex w-56 flex-row-reverse items-center rounded-3xl border bg-neutral-50'>
          <input
            className='placeholder-shown:text-gray-500 text-black focus:placeholder:text-black peer h-12 rounded-3xl border-0 bg-neutral-50 focus:outline-0'
            placeholder='Search'
          />
          <svg
            className='text-purple-500 peer-focus:text-purple-500 peer-placeholder-shown:text-gray-500 mr-2 h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
