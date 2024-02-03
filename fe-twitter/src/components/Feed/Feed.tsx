import { useContext, useEffect, useState } from 'react'
import PostItem from '../PostItem'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Tweet, TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'

const LIMIT = 5
const PAGE = 1

export default function Feed() {
  const { profile } = useContext(AppContext)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const user_id = profile?._id

  const fetchData = () => {
    if (user_id)
      http
        .get(`tweets/list/${user_id}`, {
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
    if (user_id && pagination.page <= pagination.total_page)
      http
        .get(`tweets/list/${user_id}`, {
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
  }, [user_id])

  return (
    <>
      <InfiniteScroll
        hasMore={pagination.page < pagination.total_page}
        next={fetchMoreData}
        dataLength={data.length}
        loader={<h4>Loading...</h4>}
      >
        {data?.map((post: Record<string, any>, index) => {
          // console.log(data)
          if (post.type === TweetType.Tweet) return <PostItem key={index} data={post as any} />
        })}
      </InfiniteScroll>
    </>
  )
}
