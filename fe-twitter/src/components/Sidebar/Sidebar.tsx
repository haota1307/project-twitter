import {
  IoBookmarkOutline,
  IoChatboxOutline,
  IoHomeOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline
} from 'react-icons/io5'
import { Link } from 'react-router-dom'
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
      href: '/',
      icon: IoSearchOutline
    },
    {
      label: 'Messages',
      href: '/',
      icon: IoChatboxOutline
    },
    {
      label: 'Profile',
      href: '/',
      icon: IoPersonOutline
    },
    {
      label: 'Bookmark',
      href: '/',
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
                <Link to={item.href} key={item.label}>
                  <SidebarItem label={item.label} href={item.href} icon={item.icon} />
                </Link>
              ))}
              {isAuthenticated ? (
                <SidebarItem label={'logout'} icon={IoLogOutOutline} onClick={isToggle} />
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
