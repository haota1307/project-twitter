import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import userApi from 'src/apis/user.api'
import { AppContext } from 'src/contexts/app.context'
import { setAccessTokenToLS, setRefreshTokenToLS } from 'src/utils/auth'

export default function Login() {
  const [params] = useSearchParams()
  const { setIsAuthenticated, setProfile, setIsLoginOAuth, isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    setAccessTokenToLS(access_token as string)
    setRefreshTokenToLS(refresh_token as string)
    setIsAuthenticated(true)
    setIsLoginOAuth(true)
    if (isAuthenticated) {
      userApi
        .getProfile()
        .then((res) => {
          setProfile(res.data.result[0])
          localStorage.setItem('profile', JSON.stringify(res.data.result[0]))
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [params, navigate])
  return <div>Login</div>
}
