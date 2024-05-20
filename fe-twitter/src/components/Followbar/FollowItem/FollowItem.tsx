import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'src/components/Avatar'

import { AppContext } from 'src/contexts/app.context'
import useLoginModal from 'src/hooks/useLoginModal'
import { User } from 'src/types/user.type'

interface FollowItemInterface {
  data: User
}

export default function FollowItem({ data }: FollowItemInterface) {
  const { isAuthenticated } = useContext(AppContext)

  const loginModal = useLoginModal()

  const Body = () => (
    <div className='flex flex-row items-start gap-2 mt-2 hover:bg-slate-200 p-2'>
      <Avatar url={data.avatar} />
      <div className='flex flex-col flex-1 items-start gap-2 truncate'>
        <div className='text-black text-sm font-semibold cursor-pointer hover:underline'>{data.name}</div>
        <div className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{data.username}</div>
      </div>
    </div>
  )

  {
  }

  return isAuthenticated ? (
    <Link to={`/users/${data.username}`}>
      <Body />
    </Link>
  ) : (
    <div onClick={loginModal.onOpen} className='cursor-pointer'>
      <Body />
    </div>
  )
}
