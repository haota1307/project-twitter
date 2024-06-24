import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import Page404 from 'src/pages/Page404/Page404'
import http from 'src/utils/http'
import config from 'src/constants/config'
import { toast } from 'react-toastify'
import { getAccessTokenFromLs } from 'src/utils/auth'
import { UserRole, UserVerifyStatus } from 'src/types/user.type'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
  iat: number
  role: UserRole
  token_type: number
  user_id: string
  verify: UserVerifyStatus
}

const CheckBannedStatus = ({ children }: { children: React.ReactElement | any }) => {
  const { profile, isAuthenticated, setProfile } = useContext(AppContext)
  const [isBanned, setIsBanned] = useState(false)
  const access_token = getAccessTokenFromLs()
  const navigate = useNavigate()

  useEffect(() => {
    if (access_token !== '' && isAuthenticated) {
      const decodedToken = jwtDecode<DecodedToken>(access_token)
      if (decodedToken.verify === 2 && profile?.ban_info !== null) {
        setIsBanned(true)
      }
    }
  }, [access_token, isAuthenticated])

  useEffect(() => {
    const checkAndUnlockUser = async () => {
      if (profile?.ban_info?.ban_end_date) {
        const banEndDate = new Date(profile.ban_info.ban_end_date)
        const currentDate = new Date()

        if (banEndDate <= currentDate) {
          try {
            await http.post(
              'admin/process-ban-end',
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                baseURL: config.baseUrl
              }
            )
            setProfile({
              ...profile,
              ban_info: null
            })
            toast.success('You have been unblocked')
            navigate('/')
          } catch (error) {
            console.error('Failed to unlock user:', error)
          }
        }
      }
    }

    if (isAuthenticated) {
      checkAndUnlockUser()
    }

    if (isBanned && isAuthenticated) {
      navigate('/ban')
    }
  }, [isAuthenticated, isBanned, profile, setProfile, navigate])

  console.log('isBanned', isBanned)

  return isBanned ? <Page404 /> : children
}

export default CheckBannedStatus
