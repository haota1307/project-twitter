import { Outlet } from 'react-router-dom'
import Followbar from 'src/components/Followbar'
import Sidebar from 'src/components/Sidebar'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <>
      <div className='h-screen bg-white'>
        <div className='container h-full'>
          <div className='grid grid-cols-4'>
            <Sidebar />
            <div className='col-span-3 lg:col-span-2 border-x'>
              {children}
              <Outlet />
            </div>
            <Followbar />
          </div>
        </div>
      </div>
    </>
  )
}
