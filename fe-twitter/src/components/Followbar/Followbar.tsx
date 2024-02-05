import { useEffect, useState } from 'react'
import http from 'src/utils/http'
import config from 'src/constants/config'
import FollowItem from './FollowItem'
import { User } from 'src/types/user.type'

const sizeList = 5

export default function Followbar() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    http
      .post('random/users', { sizeList }, { baseURL: config.baseUrl })
      .then((res) => {
        console.log(res)
        setUsers(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  console.log(users)

  return (
    <>
      <div className='pl-6 py-4 hidden lg:block'>
        <div className='bg-slate-100 rounded-xl top-4 sticky pb-2.5'>
          <h2 className='text-slate-600 text-xl font-semibold p-2'>Who to follow</h2>
          {users.map((user: User, index) => (
            <FollowItem key={index} data={user} />
          ))}
        </div>
      </div>
    </>
  )
}
