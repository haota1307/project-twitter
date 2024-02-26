import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import userApi from 'src/apis/user.api'
import BackGround from 'src/components/BackGround'
import Bio from 'src/components/Bio'
import Feed from 'src/components/Feed/Feed'
import Header from 'src/components/Header'
import { User } from 'src/types/user.type'

export default function Users() {
  const { user_id } = useParams()
  const { data: userData } = useQuery({
    queryKey: ['userProfile', user_id],
    queryFn: () => userApi.getUserProfile(user_id as string)
  })
  const dataUser = userData?.data.result[0] as User
  // console.log(dataUser)
  return (
    <>
      <Header label={dataUser?.username} showBackArrow />
      <BackGround data={dataUser} />
      <Bio data={dataUser} />
      <Feed userId={dataUser?._id} />
    </>
  )
}
