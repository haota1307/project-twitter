import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'src/components/Avatar'
import { AppContext } from 'src/contexts/app.context'

export default function ListConversation({ data }: { data: string[] | any }) {
  const { profile } = useContext(AppContext)
  return (
    <>
      {data?.map((item: any) => {
        return (
          <Link to={`/messages/${item?.user?.username}`} key={item.user?._id}>
            <div className='flex flex-row items-start hover:bg-slate-200 p-4 border-b'>
              <div>
                <Avatar url={item?.user?.avatar || ''} />
              </div>
              <div className='flex flex-col flex-1 items-start truncate'>
                <button className='text-black text-sm font-semibold cursor-pointer hover:underline mx-4'>
                  {item?.user?.name}
                </button>
                <div className='text-neutral-500 cursor-pointer hidden md:block mx-4 mt-2'>
                  {item?.lastMessage?.sender_id === profile?._id && <span>You:</span>}
                  {item?.lastMessage?.content}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}
