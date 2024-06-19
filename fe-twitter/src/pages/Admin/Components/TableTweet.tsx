export default function TableTweet() {
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
          <tr className='bg-white even:bg-gray-50 border-b hover:opacity-80'>
            <td scope='row' className='px-4 py-4 text-center'>
              66728a17335f0d80392d7379
            </td>
            <td className='px-4 py-4 text-center'>66728a17335f0d80392d7379</td>
            <td className='px-4 py-4 text-justify break-words max-w-80'>
              Chào mọi người tôi tên là trần Hào, Chào mọi người tôi tên là trần Hào , Chào mọi người tôi tên là trần
              Hào , Chào mọi người tôi tên là trần Hào ,Chào mọi người tôi tên là trần Hào Chào mọi người tôi tên là
              trần Hào Chào mọi người tôi tên là trần Hào Chào mọi người tôi tên là trần Hào Chào mọi người tôi tên là
              trần Hào
            </td>
            <td className='px-4 py-4'>
              <button className='font-medium text-blue-600 hover:underline mr-1'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
