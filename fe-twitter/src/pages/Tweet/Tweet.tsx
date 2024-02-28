import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import tweetApi from 'src/apis/tweet.api'
import Header from 'src/components/Header'
import TweetDetail from './components/TweetDetail'
import Form from 'src/components/Form'
import Comment from './components/Comment'

export default function Tweet() {
  const { tweet_id } = useParams()
  const { data: tweetDetailData } = useQuery({
    queryKey: ['tweetDetail', tweet_id],
    queryFn: () => tweetApi.getTweetDetail(tweet_id)
  })
  return (
    <>
      <Header label='Tweet' showBackArrow />
      <TweetDetail data={tweetDetailData?.data.result} />
      <Form isComment placeholder='Tweet your reply' />
      {/* <Comment /> */}
    </>
  )
}
