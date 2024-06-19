import { UserVerifyStatus } from 'src/types/user.type'

interface data {
  _id: string
  email: string
  username: string
  name: string
  verify: UserVerifyStatus
}

export default function TableUsers({ dataTable }: { dataTable: any }) {
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
          {dataTable.map((data: data) => (
            <tr className='bg-white even:bg-gray-50 border-b hover:opacity-80 cursor-pointer'>
              <td scope='row' className='px-4 py-4 text-center'>
                {data._id}
              </td>
              <td className='px-4 py-4 text-center max-w-48 truncate'>{data.email}</td>
              <td className='px-4 py-4 text-center max-w-48 truncate'>{data.username}</td>
              <td className='px-4 py-4 text-center max-w-40 truncate'>{data.name}</td>
              <td className='px-4 py-4 text-center'>{data.verify}</td>
              <td className='px-4 py-4 flex flex-row justify-center items-center'>
                <button className='font-medium text-blue-600 hover:underline mr-1'>1d</button>
                <button className='font-medium text-blue-600 hover:underline mr-1 border-x px-1'>1mth</button>
                <button className='font-medium text-blue-600 hover:underline'>forever</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
