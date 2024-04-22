import Header from 'src/components/Header'
import NewFeed from '../NewFeed'
import AlertVerify from 'src/components/AlertVerify'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function HomeFollowing() {
  const { profile, isAuthenticated } = useContext(AppContext)

  return (
    <>
      <Header isHomePage />
      {profile?.verify === 1 || !isAuthenticated ? <NewFeed /> : <AlertVerify />}
    </>
  )
}
