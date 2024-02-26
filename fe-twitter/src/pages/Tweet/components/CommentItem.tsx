import { useCallback } from 'react'
import Avatar from 'src/components/Avatar'
import { Tweet } from 'src/types/tweet.type'

interface PostItemProps {
  data: Tweet
}

export default function CommentItem({ data }: PostItemProps) {
  return (
    <div className='border-b p-5 cursor-pointer hover:bg-neutral-900 transition'>
      <div className='flex flex-row items-start gap-3'>
        <Avatar url='' />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p className='font-semibold cursor-pointer hover:underline'>{data.user_id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
