import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import Avatar from 'src/components/Avatar'
import { User } from 'src/types/user.type'

interface MessageContainerProps {
  data: User
}

export default function MessageContainer({ data }: MessageContainerProps) {
  const NoChatSelected = () => {
    const { profile } = useContext(AppContext)
    return (
      <div className='flex items-center justify-center w-full mt-8'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2'>
          <p>Welcome 👋 {profile?.name}</p>
          <p>Select the user you want to chat with</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <NoChatSelected />
      <div>
        <p className='font-semibold text-xl ml-2 my-4'>You following</p>
        {data?.following?.map((user: any) => (
          <Link to={`/messages/${user.username}`} key={user._id}>
            <div className='flex flex-row items-start gap-2 px-2 py-4 hover:bg-slate-200 border-b'>
              <div>
                <Avatar url={user?.avatar} />
              </div>
              <div className='flex flex-col flex-1 items-start gap-2 truncate'>
                <div className='text-black text-sm font-semibold cursor-pointer hover:underline'>{user.name}</div>
                <div className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{user.username}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
