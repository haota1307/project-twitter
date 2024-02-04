import { useEffect } from 'react'
import http from 'src/utils/http'
import config from 'src/constants/config'

const sizeList = 5

export default function Followbar() {
  // useEffect(() => {
  //   http
  //     .post('random/users', { sizeList }, { baseURL: config.baseUrl })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  return (
    <>
      <div className='pl-6 py-4 hidden lg:block'>
        <div className='bg-slate-100 rounded-xl top-4 sticky pb-2.5'>
          <h2 className='text-slate-600 text-xl font-semibold p-2'>Who to follow</h2>
          {/* <Followbar /> */}
        </div>
      </div>
    </>
  )
}
