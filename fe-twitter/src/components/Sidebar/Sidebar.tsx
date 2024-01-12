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
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'

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
  return (
    <>
      <div className='col-span-1 h-screen pr-4 md:pr-6 top-0 sticky overflow-y-scroll lg:overflow-hidden'>
        <div className='flex flex-col items-end'>
          <div className='space-y-2 lg:w-[230px]'>
            <SidebarLogo />
            {items.map((item) => (
              <Link to={item.href}>
                <SidebarItem key={item.label} label={item.label} href={item.href} icon={item.icon} />
              </Link>
            ))}
            {isAuthenticated ? (
              <Link to={'/logout'}>
                <SidebarItem label={'logout'} icon={IoLogOutOutline} />
              </Link>
            ) : (
              <Link to={'/login'}>
                <SidebarItem label={'login'} icon={IoLogInOutline} />
              </Link>
            )}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
    </>
  )
}
