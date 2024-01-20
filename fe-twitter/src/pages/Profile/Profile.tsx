import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Header from 'src/components/Header'

import Feed from 'src/components/Feed/Feed'

export default function Profile() {
  return (
    <>
      <Header label='Profile' showBackArrow />
      <BackGround />
      <Bio />
      <Feed />
    </>
  )
}
