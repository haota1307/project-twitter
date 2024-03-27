import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostItem from 'src/components/PostItem'
import config from 'src/constants/config'
import { Tweet, TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'

interface BookmarkProps {
  userId: string
}

const LIMIT = 5
const PAGE = 1

export default function BookmarkList({ userId }: BookmarkProps) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const fetchData = () => {
    if (userId)
      http
        .get('bookmarks/my-bookmarks', {
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
          const { list_Bookmark, page, total_page } = res.data.result
          setPagination({
            page,
            total_page
          }),
            setData(list_Bookmark)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const fetchMoreData = () => {
    if (userId && pagination.page <= pagination.total_page)
      http
        .get('bookmarks/my-bookmarks', {
          params: {
            limit: LIMIT,
            page: pagination.page + 1
          },
          baseURL: config.baseUrl
        })
        .then((res) => {
          const { list_Bookmark, page, total_page } = res.data.result
          setData((prevData) => [...prevData, ...list_Bookmark] as any)
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
    if (userId) fetchData()
  }, [userId])

  if (data.length === 0)
    return (
      <>
        <div className='flex justify-center items-center text-slate-400 text-lg mt-10'>
          You haven't bookmarked any tweets yet
        </div>
      </>
    )
  return (
    <InfiniteScroll
      hasMore={pagination.page < pagination.total_page}
      next={fetchMoreData}
      dataLength={data.length}
      loader={<h4>Loading...</h4>}
    >
      {data?.map((post: Record<string, any>, index) => {
        if (post.tweet[0].type === TweetType.Tweet)
          return (
            <>
              <PostItem key={post.tweet[0]._id} data={post.tweet[0] as any} user={post.user[0]} />
            </>
          )
      })}
    </InfiniteScroll>
  )
}
