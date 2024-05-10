import { useEffect, useState } from 'react'
import PostItem from '../PostItem'
import config from 'src/constants/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'
import { User } from 'src/types/user.type'
import useDeleteTweetModal from 'src/hooks/useDeleteTweet'
const LIMIT = 5
const PAGE = 1

interface FeedProps {
  user?: User
}

export default function Feed({ user }: FeedProps) {
  const [data, setData] = useState([])
  const [userData, setUserData] = useState()
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })
  const deleteTweetModal = useDeleteTweetModal()

  useEffect(() => {
    setUserData(user as any)
  }, [user?._id])

  const fetchData = () => {
    if (user?._id)
      http
        .get(`tweets/list/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            limit: LIMIT,
            page: PAGE
          },
          baseURL: config.baseUrl
        })
        .then((res) => {
          const { tweets, page, total_page } = res.data.result
          setPagination({
            page,
            total_page
          })
          setData(tweets)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const fetchMoreData = () => {
    if (user?._id && pagination.page <= pagination.total_page)
      http
        .get(`tweets/list/${user?._id}`, {
          params: {
            limit: LIMIT,
            page: pagination.page + 1
          },
          baseURL: config.baseUrl
        })
        .then((res) => {
          const { tweets, page, total_page } = res.data.result
          setData((prevData) => [...prevData, ...tweets] as any)
          setPagination({
            page: page,
            total_page
          })
        })
        .catch((err) => {
          console.log(err)
        })
  }

  useEffect(() => {
    fetchData()
  }, [user?._id])

  useEffect(() => {
    if (deleteTweetModal.isSuccess === true) {
      fetchData()
      deleteTweetModal.setFalse()
    }
  }, [deleteTweetModal.isSuccess])

  if (data.length === 0)
    return (
      <>
        <div className='flex justify-center items-center text-slate-400 text-lg mt-10'>The user has no tweet yet</div>
      </>
    )
  return (
    <InfiniteScroll
      hasMore={pagination.page < pagination.total_page}
      next={fetchMoreData}
      dataLength={data.length}
      style={{ width: 'unset' }}
      loader={<h4>Loading...</h4>}
    >
      {data?.map((post: Record<string, any>, index) => {
        if (post.type === TweetType.Tweet)
          return (
            <div className='w-full' key={index}>
              <PostItem data={post as any} user={userData} option />
            </div>
          )
      })}
    </InfiniteScroll>
  )
}
