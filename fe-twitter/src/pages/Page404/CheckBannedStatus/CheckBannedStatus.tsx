import React, { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import Page404 from 'src/pages/Page404/Page404'
import http from 'src/utils/http'
import config from 'src/constants/config'
import { toast } from 'react-toastify'

const CheckBannedStatus = ({ children }: { children: React.ReactElement | any }) => {
  const { profile, isAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const isBanned = profile?.verify === 2

  console.log(isBanned)
  console.log(profile)
  useEffect(() => {
    const checkAndUnlockUser = async () => {
      if (profile?.ban_info?.ban_end_date) {
        const banEndDate = new Date(profile.ban_info.ban_end_date)
        const currentDate = new Date()

        if (banEndDate <= currentDate) {
          try {
            // Gọi API để mở khóa người dùng
            await http
              .post('admin/process-ban-end', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                baseURL: config.baseUrl
              })
              .then(() => {
                setProfile({
                  ...profile,
                  ban_info: null // Giả sử API trả về thông tin này sau khi mở khóa
                })
                toast.success('You have been unblocked')
                navigate('/')
              })
            // Cập nhật lại profile sau khi mở khóa
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
  }, [profile, navigate, isBanned, isAuthenticated, setProfile])

  return isBanned ? <Page404 /> : children
}

export default CheckBannedStatus
