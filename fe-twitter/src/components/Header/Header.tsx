import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

interface HeaderProps {
  isHomePage?: boolean
  showBackArrow?: boolean
  label?: string
}

export default function Header({ isHomePage, showBackArrow, label }: HeaderProps) {
  return (
    <>
      {isHomePage ? (
        <div className='border-b bg-white sticky top-0 bg-opacity-90 cursor-pointer z-50'>
          <div className='flex flex-row'>
            <div className='w-3/6 text-center p-4 hover:bg-slate-100 border-r'>
              <span className='text-slate-950'>For you</span>
            </div>
            <div className='w-3/6 text-center p-4 hover:bg-slate-100'>
              <span>Following</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='border-b-[1px] p-3 sticky top-0 bg-white z-50'>
          <div className='flex flex-row items-center gap-2'>
            {showBackArrow && (
              <Link to={'/'} className='hover:opacity-80 hover:bg-slate-200 p-2 rounded-full'>
                <IoArrowBack color='black' size={20} className='cursor-pointer  transition' />
              </Link>
            )}
            <h1 className='text-black text-xl font-semibold'>{label}</h1>
          </div>
        </div>
      )}
    </>
  )
}
