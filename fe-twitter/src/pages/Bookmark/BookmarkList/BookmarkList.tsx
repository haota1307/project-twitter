import { useEffect, useState } from 'react'
import { IoBookmarkSharp } from 'react-icons/io5'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import interactApi from 'src/apis/interact.api'
import PostItem from 'src/components/PostItem'
import config from 'src/constants/config'
import { TweetType } from 'src/types/tweet.type'
import http from 'src/utils/http'

interface BookmarkProps {
  userId: string
}

const LIMIT = 20
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

  const TweetDeleted = ({ id }: any) => {
    const handleUnBookmarkByUser = async (tweetId: string) => {
      await interactApi
        .unbookmarkTweetDeleted(tweetId)
        .then(() => {
          toast.success('unbookmark successfully')
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return (
      <>
        <div className='border-b w-full'>
          <div className='flex items-center'>
            <h1 className='mx-6'>The tweet has been deleted</h1>
            <span className='mr-2'>Unbookmark now</span>
            <div
              onClick={() => handleUnBookmarkByUser(id as string)}
              className='flex flex-row items-center text-yellow-400 gap-2 cursor-pointer hover:text-yellow-400 hover:bg-yellow-50 rounded-full p-2 transform active:scale-50 transition-transform'
            >
              <IoBookmarkSharp size={20} />
            </div>
          </div>
          <div className='w-full mt-1 p-6 space-y-4 divide-y divide-gray-200 rounded animate-pulse'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='h-2.5 bg-gray-300 rounded-full w-24 mb-2.5' />
                <div className='w-32 h-2 bg-gray-200 rounded-full ' />
              </div>
              <div className='h-2.5 bg-gray-300 rounded-full w-12' />
            </div>
          </div>
        </div>
      </>
    )
  }

  if (data.length === 0)
    return (
      <>
        <div className='flex justify-center items-center text-slate-400 text-lg mt-10'>
          {"You haven't bookmarked any tweets yet"}
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
      {data?.map((post: Record<string, any>) => {
        return (
          <>
            {post.tweet[0] === undefined && <TweetDeleted id={post._id as string} />}
            {post?.tweet[0]?.type === TweetType?.Tweet && (
              <PostItem key={post.tweet[0]._id} data={post.tweet[0] as any} user={post.user[0]} />
            )}
          </>
        )
      })}
    </InfiniteScroll>
  )
}
