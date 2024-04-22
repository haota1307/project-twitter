import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import AlertVerify from 'src/components/AlertVerify'
import Form from 'src/components/Form'
import Header from 'src/components/Header'
import PostItem from 'src/components/PostItem'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'

const LIMIT = 5
const PAGE = 1

export default function Home() {
  const { profile, isAuthenticated } = useContext(AppContext)
  const [data, setData] = useState([])
  const [userData, setUserData] = useState()
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const fetchData = () => {
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

  if (data.length === 0)
    return (
      <>
        <div className='flex justify-center items-center text-slate-400 text-lg mt-10'>The user has no tweet yet</div>
      </>
    )
  return (
    <>
      <Header isHomePage />
      {profile?.verify === 1 || !isAuthenticated ? <Form placeholder="What's happening?!" /> : <AlertVerify />}
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
                <PostItem key={index} data={post as any} />
              </>
            )
        })}
      </InfiniteScroll>
    </>
  )
}
