import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'

export default function Login() {
  const [params] = useSearchParams()
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    // const new_user = params.get('new_user')
    // const verify = params.get('verify')
    setIsAuthenticated(true)
    localStorage.setItem('access_token', access_token as string)
    localStorage.setItem('refresh_token', refresh_token as string)

    navigate('/')
  }, [params, navigate])
  return <div>Login</div>
}
