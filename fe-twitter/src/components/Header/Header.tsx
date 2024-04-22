import { useContext } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'

interface HeaderProps {
  isHomePage?: boolean
  showBackArrow?: boolean
  label?: string
  hiddenBorder?: boolean
}

export default function Header({ isHomePage, showBackArrow, label, hiddenBorder }: HeaderProps) {
  const { isAuthenticated } = useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()
  const isForYou = location.pathname === '/'
  return (
    <>
      {isHomePage ? (
        <div className={`border-b bg-white sticky top-0 bg-opacity-90 cursor-pointer w-full z-50`}>
          {isAuthenticated ? (
            <div className='flex flex-row'>
              <div className={`w-3/6 text-center p-4 hover:bg-slate-100 border-r ${isForYou ? 'bg-slate-100' : ''}`}>
                <Link to='/'>
                  <span className='text-slate-950'>For you</span>
                </Link>
              </div>
              <div className={`w-3/6 text-center p-4 hover:bg-slate-100 border-r ${!isForYou ? 'bg-slate-100' : ''}`}>
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
        <div className={`${hiddenBorder ? '' : `border-b`} p-3 z-50`}>
          <div className='flex flex-row items-center gap-2'>
            {showBackArrow && (
              <button onClick={() => navigate(-1)} className='hover:opacity-80 hover:bg-slate-200 p-2 rounded-full'>
                <IoArrowBack color='black' size={20} className='cursor-pointer transition' />
              </button>
            )}
            <h1 className='text-black text-xl font-semibold'>{label}</h1>
          </div>
        </div>
      )}
    </>
  )
}
