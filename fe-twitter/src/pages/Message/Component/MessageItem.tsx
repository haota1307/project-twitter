import { useContext } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import Avatar from 'src/components/Avatar'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import { formatDate, formatTime } from 'src/utils/date'
import socket from 'src/utils/socket'

interface MessageItemProps {
  data: {
    _id: string
    sender_id: string
    receiver_id: string
    content: string
    created_at: string
    updated_at: string
  }
  user: User
  onDelete: (messageId: string) => void
}

export default function MessageItem({ data, user, onDelete }: MessageItemProps) {
  const { profile } = useContext(AppContext)
  const isSender = data.sender_id === profile?._id

  const handleDelete = () => {
    socket.emit('delete_message', { payload: { message_id: data._id } })
    onDelete(data._id)
  }

  return (
    <>
      <div className={`flex items-start gap-2.5 mx-6 my-4 ${isSender && 'justify-end'}`}>
        {!isSender && <Avatar url={user.avatar} />}
        <div className='flex flex-col gap-1 w-full max-w-[320px]'>
          <div className={`flex items-center space-x-2 ${isSender && 'justify-end '}`}>
            <span className='text-sm font-semibold text-gray-900 '>{isSender ? 'You' : user.name}</span>
          </div>
          <div
            className={`flex flex-col p-4 border-gray-200 bg-gray-100 ${
              isSender ? 'rounded-s-xl rounded-ee-xl' : 'rounded-e-xl rounded-es-xl'
            }`}
          >
            <p className='text-sm font-normal text-gray-900'> {data.content}</p>
            <span className='text-sm font-normal text-gray-400 ml-auto'>
              {formatTime(data.created_at)} {formatDate(data.created_at)}
            </span>
            {isSender && (
              <div className='mr-2 cursor-pointer hover:opacity-70' onClick={handleDelete}>
                <IoTrashOutline size={16} />
              </div>
            )}
          </div>
          <div className='flex items-center'>
            <span className='text-sm font-normal text-gray-500'>Delivered</span>
          </div>
        </div>
      </div>
    </>
  )
}
