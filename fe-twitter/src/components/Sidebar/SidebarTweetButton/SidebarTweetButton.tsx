import { IoPencilOutline } from 'react-icons/io5'

export default function SidebarTweetButton() {
  return (
    <>
      <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-400 hover:bg-opacity-80 transition cursor-pointer'>
        <IoPencilOutline color='white' />
      </div>
      <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-80 cursor-pointer transition'>
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>Post</p>
      </div>
    </>
  )
}
