import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Header from 'src/components/Header'
import Feed from 'src/components/Feed/Feed'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import userApi from 'src/apis/user.api'

export default function Profile() {
  const { isAuthenticated } = useContext(AppContext)
  const [me, setMe] = useState()
  useEffect(() => {
    if (isAuthenticated) {
      userApi.getProfile().then((res) => {
        setMe(res.data.result[0])
      })
    }
  }, [])
  return (
    <>
      <Header label='Profile' showBackArrow />
      <BackGround edit />
      <Bio />
      <Feed user={me as any} />
    </>
  )
}
