import { useEffect, useState } from 'react'
import PostItem from '../PostItem'
import config from 'src/constants/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'
import { User } from 'src/types/user.type'
import useDeleteTweetModal from 'src/hooks/useDeleteTweet'
import { useLocation } from 'react-router-dom'
import SkeletonLoading from '../SkeletonLoading'
import usePostModal from 'src/hooks/usePostModal'
import useEditTweetModal from 'src/hooks/useEditTweet'
const LIMIT = 20
const PAGE = 1

interface FeedProps {
  user?: User
}

export default function Feed({ user }: FeedProps) {
  const location = useLocation()
  const [data, setData] = useState([])
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })
  const deleteTweetModal = useDeleteTweetModal()
  const createTweetModal = usePostModal()
  const editTwetModal = useEditTweetModal()
  const isMyProfile = location.pathname === '/profile' ? true : false
  useEffect(() => {
    setUserData(user as any)
  }, [user?._id])

  const fetchData = () => {
    setIsLoading(true)
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
        .finally(() => {
          setIsLoading(false)
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

  useEffect(() => {
    if (createTweetModal.isRefreshData === true) {
      setTimeout(() => {
        fetchData()
      }, 500)
      createTweetModal.setIsRefreshDataFalse()
    }
  }, [createTweetModal.isRefreshData])

  useEffect(() => {
    if (editTwetModal.isRefreshData === true) {
      setTimeout(() => {
        fetchData()
      }, 500)
      editTwetModal.setIsRefreshDataFalse()
    }
  }, [editTwetModal.isRefreshData])

  if (data.length === 0 && !isLoading)
    return (
      <>
        <div className='flex justify-center items-center text-slate-400 text-lg mt-10'>The user has no tweet yet</div>
      </>
    )
  return (
    <>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <InfiniteScroll
          hasMore={pagination.page < pagination.total_page}
          next={fetchMoreData}
          dataLength={data.length}
          loader={<SkeletonLoading />}
          style={{ display: 'flex', flexDirection: 'column-reverse', width: 'auto' }}
        >
          {data?.map((post: Record<string, any>, index) => {
            if (post.type === TweetType.Tweet)
              return (
                <div className='w-full' key={index}>
                  <PostItem data={post as any} user={userData} option={isMyProfile} />
                </div>
              )
          })}
        </InfiniteScroll>
      )}
    </>
  )
}
