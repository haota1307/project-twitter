import { IconType } from 'react-icons'

interface SidebarItemProps {
  label?: string
  href?: string
  icon: IconType
  onClick?: () => void
}

export default function SidebarItem({ label, href, icon: Icon, onClick }: SidebarItemProps) {
  return (
    <>
      <div onClick={onClick}>
        <div className='flex flex-row items-center'>
          <div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer lg:hidden'>
            <Icon size={28} />
          </div>
          <div className='relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer'>
            <Icon size={28} />

            <p className='hidden lg:block text-black texl-xl'>{label}</p>
          </div>
        </div>
      </div>
    </>
  )
}
