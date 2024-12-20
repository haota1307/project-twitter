import { Link } from 'react-router-dom'
import Avatar from 'src/components/Avatar'

interface SearUserItemProps {
  data: string[]
}

export default function SearchUserItem({ data }: SearUserItemProps) {
  if (data?.length === 0 || data === undefined)
    return (
      <div className='mt-12 text-gray-400 flex items-center justify-center'>
        Ohh no!! The results you were looking for were not found
      </div>
    )
  return (
    <>
      {data?.map((user: any, index) => (
        <Link to={`/users/${user.username}`} key={index}>
          <div className='flex flex-row items-start gap-2 px-2 py-4 hover:bg-slate-200 border-b'>
            <div>
              <Avatar url={user?.avatar} />
            </div>
            <div className='flex flex-col flex-1 items-start gap-2 truncate'>
              <div className='text-black text-sm font-semibold cursor-pointer hover:underline'>{user?.name}</div>
              <div className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{user?.username}</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
