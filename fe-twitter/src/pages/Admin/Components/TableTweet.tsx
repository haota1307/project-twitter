import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Tweet } from 'src/types/tweet.type'
import http from 'src/utils/http'

interface TableTweetProps {
  dataTable: Tweet[]
}

export default function TableTweet({ dataTable }: TableTweetProps) {
  const [data, setData] = useState<Tweet[]>(dataTable)

  const handleDeleteTweet = (tweet_id: string) => {
    http
      .delete(`tweets/delete/${tweet_id}`)
      .then((res) => {
        toast.success(res.data.message, {
          position: 'top-center',
          autoClose: 1500
        })
        // Remove the deleted tweet from the state
        setData((prevData) => prevData.filter((tweet) => tweet._id !== tweet_id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (dataTable) setData(dataTable)
  }, [dataTable])

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll'>
        <thead className='text-xs text-white uppercase bg-blue-400'>
          <tr>
            <th scope='col' className='px-4 py-3 text-center'>
              Tweet Id
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Author Id
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Content
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((tweet) => (
            <tr key={tweet._id} className='bg-white even:bg-gray-50 border-b hover:opacity-80'>
              <td scope='row' className='px-4 py-4 text-center'>
                {tweet._id}
              </td>
              <td className='px-4 py-4 text-center'>{tweet.user_id}</td>
              <td className='px-4 py-4 text-justify break-words max-w-80'>{tweet.content}</td>
              <td className='px-4 py-4'>
                <button
                  className='font-medium text-blue-600 hover:underline mr-1'
                  onClick={() => handleDeleteTweet(tweet?._id as string)}
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
