import Header from 'src/components/Header'
import MessageItem from '../../Component/MessageItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useContext, useEffect, useState } from 'react'
import http from 'src/utils/http'
import { AppContext } from 'src/contexts/app.context'
import socket from 'src/utils/socket'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { User } from 'src/types/user.type'

const LIMIT = 10
const PAGE = 1

export default function Conversation() {
  const { user_name } = useParams()
  const { profile } = useContext(AppContext)
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState<any>([])
  const [receiver, setReceiver] = useState('')
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const { data: userData } = useQuery({
    queryKey: ['userProfile', user_name],
    queryFn: () => userApi.getUserProfile(user_name as string)
  })
  const dataUser = userData?.data.result[0] as User

  useEffect(() => {
    if (dataUser) setReceiver(dataUser?._id as string)
  }, [dataUser])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      const { payload } = data
      setConversations((conversations: any) => [payload, ...conversations])
    })
    socket.on('connect_error', (err: any) => {
      console.log(err.data)
    })
    socket.on('disconnect', (reason) => {
      console.log(reason)
    })
  }, [])

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

  const fetchMoreConversations = () => {
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
          setConversations((prev: any) => [...prev, ...conversations])
          setPagination({
            page,
            total_page
          })
        })
    }
  }

  const send = (e: any) => {
    e.preventDefault()
    setValue('')
    if (value.trim() === '') return
    const conversation = {
      content: value,
      sender_id: profile?._id,
      receiver_id: receiver,
      created_at: new Date()
    }
    socket.emit('send_message', {
      payload: conversation
    })
    setConversations((conversations: any) => [
      {
        ...conversation,
        _id: new Date().getTime()
      },
      ...conversations
    ])
  }
  return (
    <div>
      <Header label={`Chat with ${dataUser?.name}`} showBackArrow />
      <div id='scrollableDiv' className='h-[570px] w-full flex flex-col-reverse overflow-auto'>
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={conversations.length}
          next={fetchMoreConversations}
          style={{ display: 'flex', flexDirection: 'column-reverse', width: 'auto' }}
          inverse={true} //
          hasMore={pagination.page < pagination.total_page}
          loader={<h4>Loading...</h4>}
          scrollableTarget='scrollableDiv'
        >
          {conversations.map((conversation: any, index: any) => (
            <MessageItem user={dataUser} data={conversation} key={index} />
          ))}
        </InfiniteScroll>
      </div>
      <div className='w-full'>
        <form onSubmit={send}>
          <div className='flex items-center px-3 py-2 rounded-lg bg-gray-50'>
            <input
              className='block mx-4 p-2.5 w-full text-sm bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Your message...'
              type='text'
              onChange={(e) => {
                setValue(e.target.value)
              }}
              value={value}
            />
            <button
              type='submit'
              className='inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100'
            >
              <svg
                className='w-5 h-5 rotate-90 rtl:-rotate-90'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 18 20'
              >
                <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
              </svg>
              <span className='sr-only'>Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
