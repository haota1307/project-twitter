export default function Table() {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-white uppercase bg-blue-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Id
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Username
            </th>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-white even:bg-gray-50 border-b'>
            <td scope='row' className='px-6 py-4'>
              66728a17335f0d80392d7379
            </td>
            <td className='px-6 py-4'>haodev1307@gmail.com</td>
            <td className='px-6 py-4'>_tah1307</td>
            <td className='px-6 py-4'>Trần Anh Hào</td>
            <td className='px-6 py-4'>Verify</td>
            <td className='px-6 py-4'>
              <a href='#' className='font-medium text-blue-600 hover:underline mr-2'>
                Ban user
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
