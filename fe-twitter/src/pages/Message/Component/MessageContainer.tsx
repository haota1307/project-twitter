import InfiniteScroll from 'react-infinite-scroll-component'
import MessageItem from './MessageItem'
import { useContext, useEffect, useState } from 'react'
import http from 'src/utils/http'
import { AppContext } from 'src/contexts/app.context'

const LIMIT = 10
const PAGE = 1

export default function MessageContainer() {
  const [value, setValue] = useState('')
  const [data, setData] = useState(['1', '2'])
  const [conversations, setConversations] = useState([])
  const [receiver, setReceiver] = useState('')
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })
  // Lấy ra list tin nhắn
  useEffect(() => {
    if (receiver) {
      http
        .get(`/conversations/receivers/${receiver}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            limit: LIMIT,
            page: PAGE
          }
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result
          setConversations(conversations)
          setPagination({
            page,
            total_page
          })
        })
    }
  }, [receiver])

  const fetchMoreData = () => {
    if (receiver && pagination.page < pagination.total_page) {
      http
        .get(`/conversations/receivers/${receiver}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            limit: LIMIT,
            page: pagination.page + 1
          }
        })
        .then((res) => {
          const { conversations, page, total_page } = res.data.result
          setConversations((prev) => [...prev, ...conversations] as any)
          setPagination({
            page,
            total_page
          })
        })
    }
  }

  const NoChatSelected = () => {
    const { profile } = useContext(AppContext)
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2'>
          <p>Welcome 👋 {profile?.name}</p>
          <p>Select a chat to start messaging</p>
          {/* <TiMessages className='text-3xl md:text-6xl text-center' /> */}
        </div>
      </div>
    )
  }
  return (
    <>
      <InfiniteScroll
        hasMore={pagination.page < pagination.total_page}
        next={fetchMoreData}
        dataLength={data.length}
        loader={<h4>Loading...</h4>}
      >
        {/* <NoChatSelected /> */}
        {/* {data?.map((post: Record<string, any>, index: any) => { */}
        {data?.map((post: any, index: any) => {
          return (
            <>
              <MessageItem key={index} />
              <MessageItem key={index} />
            </>
          )
        })}
      </InfiniteScroll>
    </>
  )
}
