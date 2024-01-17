import { useContext } from 'react'
import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Header from 'src/components/Header'
import { AppContext } from 'src/contexts/app.context'

export default function Profile() {
  const { profile } = useContext(AppContext)

  return (
    <>
      <Header label='Profile' showBackArrow />
      <BackGround userId={profile?._id as string} srcBGC='' />
      <Bio />
    </>
  )
}
