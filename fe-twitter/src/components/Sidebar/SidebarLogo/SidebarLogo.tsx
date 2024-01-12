import { IoLogoTwitter } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function SidebarLogo() {
  return (
    <>
      <div className='rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition'>
        <Link to='/'>
          <IoLogoTwitter size={32} color='#38BDF8' />
        </Link>
      </div>
    </>
  )
}
