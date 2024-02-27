import { useEffect, useState } from 'react'
import PostItem from '../PostItem'
import config from 'src/constants/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'
import { useLocation } from 'react-router-dom'

const LIMIT = 5
const PAGE = 1

export default function Feed({ userId }: any) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const fetchData = () => {
    if (userId)
      http
        .get(`tweets/list/${userId}`, {
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
    if (userId && pagination.page <= pagination.total_page)
      http
        .get(`tweets/list/${userId}`, {
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
    console.log('fetch')
  }, [userId])

  console.log(userId)
  return (
    <InfiniteScroll
      hasMore={pagination.page < pagination.total_page}
      next={fetchMoreData}
      dataLength={data.length}
      loader={<h4>Loading...</h4>}
    >
      {data?.map((post: Record<string, any>, index) => {
        console.log(data)
        if (post.type === TweetType.Tweet)
          return (
            <>
              <PostItem key={index} data={post as any} />
            </>
          )
      })}
    </InfiniteScroll>
  )
}
