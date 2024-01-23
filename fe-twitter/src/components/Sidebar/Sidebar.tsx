import {
  IoBookmarkOutline,
  IoChatboxOutline,
  IoHomeOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline
} from 'react-icons/io5'
import { useCallback, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import useLoginModal from 'src/hooks/useLoginModal'
import useLogoutModal from 'src/hooks/useLogoutModal'

export default function Sidebar() {
  const { isAuthenticated } = useContext(AppContext)
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: IoHomeOutline
    },
    {
      label: 'Explore',
      href: '/explore',
      icon: IoSearchOutline
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: IoChatboxOutline
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: IoPersonOutline
    },
    {
      label: 'Bookmark',
      href: '/bookmark',
      icon: IoBookmarkOutline
    }
  ]

  const loginModal = useLoginModal()
  const logoutModal = useLogoutModal()
  const isToggle = useCallback(() => {
    if (!isAuthenticated) {
      loginModal.onOpen()
      return
    }
    logoutModal.onOpen()
  }, [isAuthenticated, loginModal, logoutModal])

  return (
    <>
      <div className='col-span-1 h-screen pr-4 md:pr-6 top-0 sticky'>
        <div className='top-0 sticky'>
          <div className='flex flex-col items-end'>
            <div className='space-y-2 lg:w-[230px] pt-4'>
              <SidebarLogo />
              {items.map((item) => (
                <SidebarItem key={item.href} label={item.label} href={item.href} icon={item.icon} onClick={isToggle} />
              ))}
              {isAuthenticated ? (
                <SidebarItem label={'logout'} icon={IoLogOutOutline} onClick={isToggle} href='logout' />
              ) : (
                <SidebarItem label={'login'} icon={IoLogInOutline} onClick={isToggle} />
              )}
              <SidebarTweetButton />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
