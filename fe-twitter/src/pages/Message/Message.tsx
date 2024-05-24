import Header from 'src/components/Header'
import MessageContainer from './Component/MessageContainer'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import userApi from 'src/apis/user.api'
import { User } from 'src/types/user.type'
import ListConversation from './Component/ListConversation'
import conversationApi from 'src/apis/conversation.api'
import SkeletonLoading from 'src/components/SkeletonLoading'

export default function Message() {
  const [me, setMe] = useState<User>()
  const [data, setData] = useState<string[]>([''])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([
        conversationApi
          .getListConversation()
          .then((res) => {
            console.log(res)
            setData(res.data.result)
          })
          .catch((err) => {
            console.log(err)
          }),
        userApi.getProfile().then((res) => {
          setMe(res.data.result[0])
        })
      ]).finally(() => {
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <>
      <Header label='Message' showBackArrow />
      {isLoading && <SkeletonLoading />}
      {data.length > 0 && !isLoading && <ListConversation data={data} />}
      {data.length === 0 && isLoading && <MessageContainer data={me as User} />}
    </>
  )
}
