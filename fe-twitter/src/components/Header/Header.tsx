import { useContext } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'

interface HeaderProps {
  isHomePage?: boolean
  showBackArrow?: boolean
  label?: string
}

export default function Header({ isHomePage, showBackArrow, label }: HeaderProps) {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <>
      {isHomePage ? (
        <div className='border-b bg-white sticky top-0 bg-opacity-90 cursor-pointer w-full'>
          {isAuthenticated ? (
            <div className='flex flex-row'>
              <div className='w-3/6 text-center p-4 hover:bg-slate-100 border-r'>
                <Link to='/'>
                  <span className='text-slate-950'>For you</span>
                </Link>
              </div>
              <div className='w-3/6 text-center p-4 hover:bg-slate-100'>
                <Link to='/following'>
                  <span>Following</span>
                </Link>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className='border-b-[1px] p-3'>
          <div className='flex flex-row items-center gap-2'>
            {showBackArrow && (
              <Link to='/' className='hover:opacity-80 hover:bg-slate-200 p-2 rounded-full'>
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
