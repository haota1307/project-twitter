import { useContext } from 'react'
import AlertVerify from 'src/components/AlertVerify'
import Form from 'src/components/Form'
import Header from 'src/components/Header'
import { AppContext } from 'src/contexts/app.context'

export default function Home() {
  const { profile } = useContext(AppContext)

  return (
    <>
      <Header isHomePage />
      {profile?.verify === 1 ? <Form placeholder="What's happening?!" /> : <AlertVerify />}
    </>
  )
}
