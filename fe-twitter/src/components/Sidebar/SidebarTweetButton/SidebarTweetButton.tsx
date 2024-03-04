import { useCallback, useContext } from 'react'
import { IoPencilOutline } from 'react-icons/io5'
import { AppContext } from 'src/contexts/app.context'
import useLoginModal from 'src/hooks/useLoginModal'
import usePostModal from 'src/hooks/usePostModal'

export default function SidebarTweetButton() {
  const { isAuthenticated } = useContext(AppContext)

  const loginModal = useLoginModal()
  const postModal = usePostModal()

  const isToggle = useCallback(() => {
    if (!isAuthenticated) {
      loginModal.onOpen()
      return
    }
    postModal.onOpen()
  }, [loginModal, postModal])
  return (
    <>
      <div onClick={isToggle}>
        <div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition cursor-pointer'>
          <IoPencilOutline color='white' />
        </div>
        <div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer transition'>
          <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>Post</p>
        </div>
      </div>
    </>
  )
}
