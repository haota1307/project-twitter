import { useEffect, useState } from 'react'
import config from 'src/constants/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'
import PostItem from 'src/components/PostItem'
import SkeletonLoading from 'src/components/SkeletonLoading'
const LIMIT = 20
const PAGE = 1

export default function NewFeed() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const fetchData = () => {
    setIsLoading(true)
    http
      .get('tweets', {
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
        console.log(tweets[0]?.user)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const fetchMoreData = () => {
    if (pagination.page <= pagination.total_page)
      http
        .get('tweets', {
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
  }, [])

  if (data.length === 0 && isLoading === false)
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
          loader={<h4>Loading...</h4>}
        >
          {data?.map((post: Record<string, any>, index) => {
            if (post.type === TweetType.Tweet)
              return (
                <>
                  <PostItem key={index} data={post as any} user={post.user} />
                </>
              )
          })}
        </InfiniteScroll>
      )}
    </>
  )
}
