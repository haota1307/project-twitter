import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import AdminBar from 'src/layouts/AdminLayout/AdminBar'

interface Props {
  children?: React.ReactNode
}
function AdminLayoutInner({ children }: Props) {
  return (
    <>
      <div className='h-screen bg-white'>
        <div className='lg:container h-full'>
          <div className='grid grid-cols-4'>
            <AdminBar />
            <div className='col-span-3 lg:col-span-3 border-l'>
              {children}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const AdminLayout = memo(AdminLayoutInner)
export default AdminLayout
