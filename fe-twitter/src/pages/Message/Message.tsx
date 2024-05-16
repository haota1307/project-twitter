import Header from 'src/components/Header'
import MessageContainer from './Component/MessageContainer'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import userApi from 'src/apis/user.api'
import { User } from 'src/types/user.type'
import ListConversation from './Component/ListConversation'
import conversationApi from 'src/apis/conversation.api'

export default function Message() {
  const [me, setMe] = useState<User>()
  const [data, setData] = useState<string[]>([''])

  const { isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    if (isAuthenticated) {
      userApi.getProfile().then((res) => {
        setMe(res.data.result[0])
      })
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      conversationApi
        .getListConversation()
        .then((res) => {
          console.log(res)
          setData(res.data.result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <>
      <Header label='Message' showBackArrow />
      {data.length > 0 ? <ListConversation data={data} /> : <MessageContainer data={me as User} />}
    </>
  )
}
