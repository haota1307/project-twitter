import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Followbar from 'src/components/Followbar'
import Sidebar from 'src/components/Sidebar'

interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  return (
    <>
      <div className='h-screen bg-white'>
        <div className='lg:container h-full'>
          <div className='grid grid-cols-4'>
            <Sidebar />
            <div className='col-span-3 lg:col-span-2 lg:border-x border-l'>
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
const MainLayout = memo(MainLayoutInner)
export default MainLayout
