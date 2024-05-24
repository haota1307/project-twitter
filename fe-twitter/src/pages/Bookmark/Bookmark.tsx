import Header from 'src/components/Header'
import BookmarkList from './BookmarkList'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Helmet } from 'react-helmet'

export default function Bookmark() {
  const { profile } = useContext(AppContext)
  const myUserId = profile?._id
  return (
    <>
      <Helmet>
        <title>Twitter | Bookmark</title>
      </Helmet>
      <Header showBackArrow label='Bookmark' />
      <BookmarkList userId={myUserId as string} />
    </>
  )
}
