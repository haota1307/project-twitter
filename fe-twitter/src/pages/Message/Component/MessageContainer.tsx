import InfiniteScroll from 'react-infinite-scroll-component'
import MessageItem from './MessageItem'
import { useContext, useEffect, useState } from 'react'
import http from 'src/utils/http'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import Avatar from 'src/components/Avatar'

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
      <div className='flex items-center justify-center w-full mt-8'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2'>
          <p>Welcome 👋 {profile?.name}</p>
          <p>Select the user you want to chat with</p>
        </div>
      </div>
    )
  }

  const UserItem = () => {
    const { profile } = useContext(AppContext)
    return profile?.following?.map((user: any) => (
      <Link to={`/messages/${user.username}`} key={user._id}>
        <div className='flex flex-row items-start gap-2 px-2 py-4 hover:bg-slate-200 border-b'>
          <div>
            <Avatar url={user?.avatar} />
          </div>
          <div className='flex flex-col flex-1 items-start gap-2 truncate'>
            <div className='text-black text-sm font-semibold cursor-pointer hover:underline'>{user.name}</div>
            <div className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{user.username}</div>
          </div>
        </div>
      </Link>
    ))
  }

  return (
    <>
      <NoChatSelected />
      <div>
        <p className='font-semibold text-xl ml-2 my-4'>You following</p>
        <UserItem />
      </div>
    </>
  )
}
