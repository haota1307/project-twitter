import { useState } from 'react'
import axios from 'axios' // Make sure to install axios via npm or yarn
import http from 'src/utils/http'

interface Data {
  _id: string
  email: string
  username: string
  name: string
  verify: UserVerifyStatus
}

enum UserVerifyStatus {}
// Define your UserVerifyStatus enum here based on your application

interface Props {
  dataTable: Data[]
}

const TableUsers: React.FC<Props> = ({ dataTable }) => {
  const handleBanUser = async (userId: string, duration: '1d' | '1mth' | 'forever') => {
    try {
      let banEndDate: string

      switch (duration) {
        case '1d':
          const nextDay = new Date()
          nextDay.setDate(nextDay.getDate() + 1)
          banEndDate = nextDay.toISOString().slice(0, 10)
          break
        case '1mth':
          const nextMonth = new Date()
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          banEndDate = nextMonth.toISOString().slice(0, 10)
          break
        case 'forever':
          banEndDate = '9999-12-31' // Or any future date representing indefinite ban
          break
        default:
          throw new Error('Invalid ban duration')
      }

      const banInfo = {
        ban_end_date: banEndDate,
        ban_reason: ''
      }

      const response = await http.patch(`/admin/users/${userId}/ban`, { ban_info: banInfo })
      console.log('Ban user response:', response.data) // Handle response as needed

      // Optionally, update the UI to reflect the user's ban status
    } catch (error) {
      console.error('Error banning user:', error)
      // Handle error states or display an error message to the user
    }
  }

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll'>
        <thead className='text-xs text-white uppercase bg-blue-400'>
          <tr>
            <th scope='col' className='px-4 py-3 text-center'>
              Id user
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Email
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Username
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Name
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Status
            </th>
            <th scope='col' className='px-4 py-3 text-center'>
              Ban
            </th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((data: Data) => (
            <tr key={data._id} className='bg-white even:bg-gray-50 border-b hover:opacity-80 cursor-pointer'>
              <td scope='row' className='px-4 py-4 text-center'>
                {data._id}
              </td>
              <td className='px-4 py-4 text-center max-w-48 truncate'>{data.email}</td>
              <td className='px-4 py-4 text-center max-w-48 truncate'>{data.username}</td>
              <td className='px-4 py-4 text-center max-w-40 truncate'>{data.name}</td>
              <td className='px-4 py-4 text-center'>{data.verify}</td>
              <td className='px-4 py-4 flex flex-row justify-center items-center'>
                <button
                  className='font-medium text-blue-600 hover:underline mr-1'
                  onClick={() => handleBanUser(data._id, '1d')}
                >
                  1d
                </button>
                <button
                  className='font-medium text-blue-600 hover:underline mr-1 border-x px-1'
                  onClick={() => handleBanUser(data._id, '1mth')}
                >
                  1mth
                </button>
                <button
                  className='font-medium text-blue-600 hover:underline'
                  onClick={() => handleBanUser(data._id, 'forever')}
                >
                  forever
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUsers
