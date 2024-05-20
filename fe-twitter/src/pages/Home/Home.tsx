import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import AlertVerify from 'src/components/AlertVerify'
import Form from 'src/components/Form'
import Header from 'src/components/Header'
import PostItem from 'src/components/PostItem'
import SkeletonLoading from 'src/components/SkeletonLoading'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'

const LIMIT = 20
const PAGE = 1

export default function Home() {
  const { profile, isAuthenticated } = useContext(AppContext)
  const [data, setData] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const fetchData = () => {
    setIsloading(true)
    http
      .get('tweets/home-feed', {
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
        console.log(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsloading(false)
      })
  }

  const fetchMoreData = () => {
    if (pagination.page <= pagination.total_page)
      http
        .get('tweets/home-feed', {
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

  const handleNewPost = () => {
    fetchData()
  }

  return (
    <>
      <Header isHomePage />
      {profile?.verify === 1 || !isAuthenticated ? (
        <Form placeholder="What's happening?!" refreshFeed={handleNewPost} />
      ) : (
        <AlertVerify />
      )}
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <InfiniteScroll
          hasMore={pagination.page < pagination.total_page}
          next={fetchMoreData}
          dataLength={data.length}
          loader={
            <h4>
              <SkeletonLoading />
            </h4>
          }
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
