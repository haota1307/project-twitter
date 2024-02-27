import { useContext, useEffect, useState } from 'react'
import http from 'src/utils/http'
import config from 'src/constants/config'
import FollowItem from './FollowItem'
import { User } from 'src/types/user.type'
import { AppContext } from 'src/contexts/app.context'

const sizeList = 5

export default function Followbar() {
  const { isAuthenticated } = useContext(AppContext)
  const [profile, setProfile] = useState<User>()
  const [users, setUsers] = useState([])
  useEffect(() => {
    http
      .post('random/users', { sizeList }, { baseURL: config.baseUrl })
      .then((res) => {
        setUsers(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (isAuthenticated)
      http
        .get('users/profile')
        .then((res) => {
          setProfile(res.data.result[0])
        })
        .catch((err) => console.log(err))
  }, [])

  const listFollowingUserId = profile?.following?.map((user: any) => user?._id) as string[]

  return (
    <>
      <div className='pl-6 py-4 hidden lg:block col-span-1'>
        <div className='bg-slate-100 rounded-xl top-4 sticky pb-2.5'>
          <h2 className='text-slate-600 text-xl font-semibold p-2'>Who to follow</h2>
          {users.map(
            (user: User, index) =>
              user?._id !== profile?._id && <FollowItem key={index} data={user} followingArrId={listFollowingUserId} />
          )}
        </div>
      </div>
    </>
  )
}
