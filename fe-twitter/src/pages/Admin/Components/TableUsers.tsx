import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import http from 'src/utils/http'

interface Data {
  _id: string
  email: string
  username: string
  name: string
  verify: UserVerifyStatus
  ban_info?: { ban_end_date: string } // Assuming this is the structure of ban_info
}

enum UserVerifyStatus {
  UNVERIFIED = 0,
  VERIFIED = 1,
  BANNED = 2
}

interface Props {
  dataTable: Data[]
}

const TableUsers: React.FC<Props> = ({ dataTable }) => {
  const [users, setUsers] = useState(dataTable)

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

      await http.patch(`/admin/users/${userId}/ban`, { ban_info: banInfo })
      toast('Ban user success')

      // Update the state to reflect the ban
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, verify: UserVerifyStatus.BANNED } : user))
      )
    } catch (error) {
      console.error('Error banning user:', error)
    }
  }

  const handleUnbanUser = async (userId: string) => {
    try {
      await http.post(`/admin/users/${userId}/unban`)
      toast('Unban user success')

      // Update the state to reflect the unban
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, verify: UserVerifyStatus.VERIFIED } : user))
      )
    } catch (error) {
      console.error('Error unbanning user:', error)
    }
  }

  useEffect(() => {
    setUsers(dataTable)
  }, [dataTable])

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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((data: Data) => (
            <tr key={data._id} className='bg-white even:bg-gray-50 border-b hover:opacity-80 cursor-pointer'>
              <td scope='row' className='px-4 py-4 text-center'>
                {data._id}
              </td>
              <td className='px-4 py-4 text-center max-w-48 truncate'>{data.email}</td>
              <td className='px-4 py-4 text-center max-w-48 truncate'>{data.username}</td>
              <td className='px-4 py-4 text-center max-w-40 truncate'>{data.name}</td>
              <td className='px-4 py-4 text-center'>{data.verify === UserVerifyStatus.BANNED ? 'Banned' : 'Active'}</td>
              <td className='px-4 py-4 flex flex-row justify-center items-center'>
                {data.verify === UserVerifyStatus.BANNED ? (
                  <button
                    className='font-medium text-blue-600 hover:underline'
                    onClick={() => handleUnbanUser(data._id)}
                  >
                    Unban
                  </button>
                ) : (
                  <>
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
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUsers
