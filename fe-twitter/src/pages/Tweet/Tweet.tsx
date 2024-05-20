import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import tweetApi from 'src/apis/tweet.api'
import Header from 'src/components/Header'
import TweetDetail from './components/TweetDetail'
import Form from 'src/components/Form'
import Comment from './components/Comment'
import { useState } from 'react'
import SkeletonLoading from 'src/components/SkeletonLoading'

export default function Tweet() {
  const [isLoading, setIsLoading] = useState(true)
  const { tweet_id } = useParams()
  const { data: tweetDetailData } = useQuery({
    queryKey: ['tweetDetail', tweet_id],
    queryFn: () => tweetApi.getTweetDetail(tweet_id as string).finally(() => setIsLoading(false))
  })

  return (
    <>
      {isLoading ? (
        <>
          <SkeletonLoading />
        </>
      ) : (
        <>
          <Header label='Tweet' showBackArrow />
          <TweetDetail data={tweetDetailData?.data?.result} />
          <Form isComment={true} placeholder='Tweet your reply' parentId={tweet_id} labelBtn='reply' />
          <Comment tweetParent={tweetDetailData?.data.result} key={tweet_id} />
        </>
      )}
    </>
  )
}
