import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { getAccessTokenFromLs } from 'src/utils/auth'
import { jwtDecode } from 'jwt-decode'
import { UserRole } from 'src/types/user.type'

interface DecodedToken {
  exp: number
  iat: number
  role: UserRole
  token_type: number
  user_id: string
  verify: number
}

const AdminRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  const access_token = getAccessTokenFromLs()
  if (access_token !== '') {
    const decodedToken = jwtDecode<DecodedToken>(access_token)
    if (!isAuthenticated || decodedToken?.role !== 'admin') {
      return <Navigate to='/' />
    }
  }

  return <Outlet />
}

export default AdminRoute
