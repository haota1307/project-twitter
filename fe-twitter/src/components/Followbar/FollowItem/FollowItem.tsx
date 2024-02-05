import { useCallback, useContext, useState } from 'react'
import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'
import useLoginModal from 'src/hooks/useLoginModal'
import { User } from 'src/types/user.type'
import http from 'src/utils/http'

interface FollowItemInterface {
  data: User
}

export default function FollowItem({ data }: FollowItemInterface) {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [isFollow, setIsFollow] = useState(false)

  const loginModal = useLoginModal()
  const isToggle = useCallback(() => {
    if (isAuthenticated) {
      return
    }
    loginModal.onOpen()
  }, [isAuthenticated, loginModal])

  const handleFollowByUser = () => {
    http
      .post(
        'users/follow',
        { followed_user_id: data._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: config.baseUrl
        }
      )
      .then((res) => {
        console.log(res)
        setIsFollow(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='flex flex-row items-start gap-2 mt-2 hover:bg-slate-200 p-2'>
      <Avatar url={data.avatar} />
      <div className='flex flex-col flex-1 items-start gap-2 truncate'>
        <p className='text-black text-sm font-semibold cursor-pointer hover:underline'>{data.name}</p>
        <p className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.username}</p>
      </div>
      <div className='flex flex-row items-end mr-0'>
        {!isFollow ? (
          <Button label='Follow' secondary onClick={isAuthenticated ? handleFollowByUser : isToggle} />
        ) : (
          <Button label='Following' secondary onClick={isAuthenticated ? handleFollowByUser : isToggle} />
        )}
      </div>
    </div>
  )
}
