import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import userApi from 'src/apis/user.api'
import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Feed from 'src/components/Feed/Feed'
import Header from 'src/components/Header'
import { User } from 'src/types/user.type'

export default function Users() {
  const { user_name } = useParams()
  const { data: userData } = useQuery({
    queryKey: ['userProfile', user_name],
    queryFn: () => userApi.getUserProfile(user_name as string)
  })

  const dataUser = userData?.data.result[0] as User

  return (
    <>
      <Helmet>
        <title>Twitter | Info</title>
        <meta name='discription' content='Trang chủ dự án' />
      </Helmet>
      <Header label={dataUser?.username} showBackArrow />
      <BackGround data={dataUser} />
      <Bio data={dataUser} />
      <Feed user={dataUser} />
    </>
  )
}
