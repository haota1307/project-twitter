import Header from 'src/components/Header'
import BookmarkList from './BookmarkList'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function Bookmark() {
  const { profile } = useContext(AppContext)
  const myUserId = profile?._id
  return (
    <>
      <Header showBackArrow label='Bookmark' />
      <BookmarkList userId={myUserId as string} />
    </>
  )
}
