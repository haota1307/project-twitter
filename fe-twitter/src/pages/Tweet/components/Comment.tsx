import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostItem from 'src/components/PostItem'
import SkeletonLoading from 'src/components/SkeletonLoading'
import config from 'src/constants/config'
import usePostModal from 'src/hooks/usePostModal'
import { Tweet, TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'

const LIMIT = 20
const PAGE = 1

interface CommentItemProps {
  tweetParent?: Tweet
}

export default function Comment({ tweetParent }: CommentItemProps) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })

  const postModal = usePostModal()

  const fetchData = () => {
    setIsLoading(true)
    if (tweetParent)
      http
        .get(`tweets/${tweetParent._id}/children`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            limit: LIMIT,
            page: PAGE,
            tweet_type: TweetType.Comment
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
    if (tweetParent && pagination.page <= pagination.total_page)
      http
        .get(`tweets/${tweetParent._id}/children`, {
          params: {
            limit: LIMIT,
            page: pagination.page + 1,
            tweet_type: TweetType.Comment
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
    if (tweetParent || (tweetParent && postModal.isRefreshData === true)) {
      fetchData()
      postModal.setIsRefreshDataFalse()
    }
  }, [tweetParent, postModal.isRefreshData])

  if (data.length === 0 && isLoading === false)
    return (
      <>
        <div className='flex justify-center items-center text-slate-400 text-lg mt-10'>{"Let's comment it"}</div>
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
            if (post.type === TweetType.Comment)
              return (
                <>
                  <PostItem key={index} data={post as any} isComment={true} />
                </>
              )
          })}
        </InfiniteScroll>
      )}
    </>
  )
}
