import PostItem from 'src/components/PostItem'
import { TweetType } from 'src/types/tweet.type'

interface SearchTweetItemProps {
  data?: string[]
}

export default function SearchTweetItem({ data }: SearchTweetItemProps) {
  if (data?.length === 0 || data === undefined)
    return (
      <div className='mt-12 text-gray-400 flex items-center justify-center'>
        Ohh no!! The results you were looking for were not found
      </div>
    )
  return (
    <div>
      {data?.map((post: any, index) => {
        if (post?.type === TweetType.Tweet) console.log(post)
        return (
          <>
            <PostItem key={index} data={post as any} />
          </>
        )
      })}
    </div>
  )
}
