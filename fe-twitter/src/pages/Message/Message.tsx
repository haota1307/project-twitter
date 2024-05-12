import Header from 'src/components/Header'
import MessageContainer from './Component/MessageContainer'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import userApi from 'src/apis/user.api'
import { User } from 'src/types/user.type'

export default function Message() {
  const [me, setMe] = useState<User>()

  const { isAuthenticated } = useContext(AppContext)
  useEffect(() => {
    if (isAuthenticated) {
      userApi.getProfile().then((res) => {
        setMe(res.data.result[0])
      })
    }
  }, [])

  console.log(me)

  return (
    <>
      <Header label='Message' showBackArrow />
      <MessageContainer data={me as User} />
    </>
  )
}
