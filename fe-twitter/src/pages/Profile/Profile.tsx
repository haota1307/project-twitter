import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Header from 'src/components/Header'
import Feed from 'src/components/Feed/Feed'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function Profile() {
  const { profile } = useContext(AppContext)

  const user_id = profile?._id

  return (
    <>
      <Header label='Profile' showBackArrow />
      <BackGround />
      <Bio />
      <Feed userId={user_id} />
    </>
  )
}
