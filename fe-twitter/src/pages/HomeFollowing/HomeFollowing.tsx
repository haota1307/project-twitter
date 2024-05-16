import Header from 'src/components/Header'
import NewFeed from '../NewFeed'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import AlertVerify from 'src/components/AlertVerify'

export default function HomeFollowing() {
  const { profile } = useContext(AppContext)

  return (
    <>
      <Header isHomePage />
      {profile?.verify !== 1 && <AlertVerify />}
      {profile?.verify === 1 && <NewFeed />}
    </>
  )
}
