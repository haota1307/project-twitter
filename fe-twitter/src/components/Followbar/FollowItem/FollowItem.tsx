import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button'
import { User } from 'src/types/user.type'

interface FollowItemInterface {
  data: User
}

export default function FollowItem({ data }: FollowItemInterface) {
  const handleClick = () => {}
  return (
    <div className='flex flex-row items-start gap-2 mt-2 hover:bg-slate-200 p-2'>
      <Avatar url={data.avatar} />
      <div className='flex flex-col flex-1 items-start gap-2'>
        <p className='text-black text-sm font-semibold cursor-pointer hover:underline'>{data.name}</p>
        <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>{data.username}</span>
      </div>
      <div className='flex flex-row items-end mr-0'>
        <Button label='Follow' secondary onClick={handleClick} />
      </div>
    </div>
  )
}
