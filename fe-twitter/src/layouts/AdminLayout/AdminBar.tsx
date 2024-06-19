import { IoChatbubblesOutline, IoHomeOutline, IoPeopleOutline } from 'react-icons/io5'
import SidebarItem from 'src/components/Sidebar/SidebarItem'
import SidebarLogo from 'src/components/Sidebar/SidebarLogo'

export default function AdminBar() {
  const items = [
    {
      label: 'Home',
      href: '/admin/home',
      icon: IoHomeOutline
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: IoPeopleOutline
    },
    {
      label: 'Tweets',
      href: '/admin/tweets',
      icon: IoChatbubblesOutline
    },
    {
      label: 'Conversations',
      href: '/admin/conversations',
      icon: IoChatbubblesOutline
    }
  ]
  return (
    <>
      <div className='col-span-1 h-screen pr-4 md:pr-6 top-0 sticky'>
        <div className='top-0 sticky'>
          <div className='flex flex-col items-end'>
            <div className='space-y-2 lg:w-[230px] pt-4'>
              <SidebarLogo />
              {items.map((item) => (
                <SidebarItem key={item.href} label={item.label} href={item.href} icon={item.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
