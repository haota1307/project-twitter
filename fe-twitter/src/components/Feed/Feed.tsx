import { useContext } from 'react'
import PostItem from '../PostItem'
import { AppContext } from 'src/contexts/app.context'

export default function Feed() {
  const { profile } = useContext(AppContext)
  const posts = profile?.all_tweet
  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        // console.log(post)
        <PostItem key={post.id as any} data={post as any} />
      ))}
    </>
  )
}
