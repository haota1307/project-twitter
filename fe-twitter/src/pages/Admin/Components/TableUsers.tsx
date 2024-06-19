export default function TableUsers() {
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
          <tr className='bg-white even:bg-gray-50 border-b hover:opacity-80'>
            <td scope='row' className='px-4 py-4 text-center'>
              66728a17335f0d80392d7379
            </td>
            <td className='px-4 py-4 text-center'>haodev1307@gmail.com</td>
            <td className='px-4 py-4 text-center'>_tah1307</td>
            <td className='px-4 py-4 text-center'>Trần Anh Hào</td>
            <td className='px-4 py-4 text-center'>Verify</td>
            <td className='px-4 py-4 flex flex-row justify-center items-center'>
              <button className='font-medium text-blue-600 hover:underline mr-1'>1 day</button>
              <button className='font-medium text-blue-600 hover:underline mr-1 border-x px-1'>1 month</button>
              <button className='font-medium text-blue-600 hover:underline'>forever</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
