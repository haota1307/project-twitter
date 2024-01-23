import Form from 'src/components/Form'
import Header from 'src/components/Header'

export default function Home() {
  return (
    <>
      <Header isHomePage />
      <Form placeholder="What's happening?!" />
    </>
  )
}
