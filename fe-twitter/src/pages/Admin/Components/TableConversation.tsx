import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import http from 'src/utils/http'

interface TableProps {
  dataTable: {
    _id: string
    sender_id: string
    receiver_id: string
    content: string
    updated_at: Date
    created_at: Date
  }[]
}

export default function TableConversation({ dataTable }: TableProps) {
  const [data, setData] = useState(dataTable)

  const handleDeleteConversation = (conversation_id: string) => {
    http
      .delete(`conversations/delete/${conversation_id}`)
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        // Remove the deleted conversation from the state
        setData((prevData) => prevData.filter((conversation) => conversation._id !== conversation_id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (Array.isArray(dataTable)) {
      setData(dataTable)
    } else {
      console.error('Invalid dataTable format:', dataTable)
    }
  }, [dataTable])

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll'>
        <thead className='text-xs text-white uppercase bg-blue-400'>
          <tr>
            <th scope='col' className='px-4 py-3 text-center'>
              Conversation id
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Sender id
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Receiver id
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Content
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((conversation) => (
              <tr key={conversation._id} className='bg-white even:bg-gray-50 border-b hover:opacity-80'>
                <td scope='row' className='px-4 py-4 text-center'>
                  {conversation._id}
                </td>
                <td className='px-4 py-4 text-center'>{conversation.sender_id}</td>
                <td className='px-4 py-4 text-justify break-words max-w-80'>{conversation.receiver_id}</td>
                <td className='px-4 py-4 text-justify break-words max-w-80'>{conversation.content}</td>
                <td className='px-4 py-4'>
                  <button
                    className='font-medium text-blue-600 hover:underline mr-1'
                    onClick={() => handleDeleteConversation(conversation._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
