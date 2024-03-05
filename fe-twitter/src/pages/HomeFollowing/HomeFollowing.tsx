import Header from 'src/components/Header'
import NewFeed from '../NewFeed'

export default function HomeFollowing() {
  return (
    <>
      <Header showBackArrow label='New feeds' />
      <NewFeed />
    </>
  )
}
