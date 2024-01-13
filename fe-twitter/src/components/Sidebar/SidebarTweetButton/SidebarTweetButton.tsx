import { useCallback, useContext } from 'react'
import { IoPencilOutline } from 'react-icons/io5'
import { AppContext } from 'src/contexts/app.context'
import useLoginModal from 'src/hooks/useLoginModal'

export default function SidebarTweetButton() {
  const { isAuthenticated } = useContext(AppContext)

  const loginModal = useLoginModal()
  const isToggle = useCallback(() => {
    if (!isAuthenticated) {
      loginModal.onOpen()
    }
  }, [isAuthenticated, loginModal])
  return (
    <>
      <div onClick={isToggle}>
        <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-400 hover:bg-opacity-80 transition cursor-pointer'>
          <IoPencilOutline color='white' />
        </div>
        <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-80 cursor-pointer transition'>
          <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>Post</p>
        </div>
      </div>
    </>
  )
}
