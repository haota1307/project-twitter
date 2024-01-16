import classNames from 'classnames'
import { useContext } from 'react'
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'

interface SidebarItemProps {
  label?: string
  href?: string
  icon: IconType
  onClick?: () => void
}

const SidebarLogged = ({ label, href, icon: Icon }: SidebarItemProps) => (
  <div>
    <div className='flex flex-row items-center'>
      <NavLink
        to={href as string}
        className={({ isActive }) =>
          classNames('relative rounded-full h-14 w-14 flex items-center p-3.5 justify-center lg:hidden text-black', {
            'font-semibold bg-slate-100': isActive,
            'hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer': !isActive
          })
        }
      >
        <Icon size={28} />
      </NavLink>
      <NavLink
        to={href as string}
        className={({ isActive }) =>
          classNames('relative hidden lg:flex items-center gap-4 p-3.5 rounded-full text-black', {
            'font-semibold bg-slate-100': isActive,
            'hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer': !isActive
          })
        }
      >
        <Icon size={28} />
        <p className='hidden lg:block texl-xl'>{label}</p>
      </NavLink>
    </div>
  </div>
)

const SidebarNotLogged = ({ label, href, icon: Icon, onClick }: SidebarItemProps) => (
  <div onClick={onClick}>
    <div className='flex flex-row items-center'>
      <div
        className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-400
        hover:bg-opacity-10 cursor-pointer lg:hidden'
      >
        <Icon size={28} />
      </div>
      <div className='relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer'>
        <Icon size={28} />

        <p className='hidden lg:block texl-xl'>{label}</p>
      </div>
    </div>
  </div>
)

export default function SidebarItem({ label, href, icon: Icon, onClick }: SidebarItemProps) {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <>
      {isAuthenticated && href !== 'logout' ? (
        <SidebarLogged icon={Icon} href={href} label={label} />
      ) : (
        <SidebarNotLogged icon={Icon} label={label} onClick={onClick} />
      )}
    </>
  )
}
