import { useEffect, useState } from 'react'
import config from 'src/constants/config'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/pages/Admin/Components/Pagination'
import TableTweet from 'src/pages/Admin/Components/TableTweet'
import http from 'src/utils/http'

export default function TweetsManagement() {
  const param = useQueryParams()
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [data, setData] = useState()

  useEffect(() => {
    const fectchData = async () => {
      try {
        const response = await http.get('tweets/home-feed', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            limit: 5,
            page: param.page || 1
          },
          baseURL: config.baseUrl
        })
        const result = response?.data?.result
        if (result) {
          setData(result.tweets)
          setLimit(result.limit)
          setPage(result.page)
          setTotalPage(result.total_page)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fectchData()
  }, [param.page])

  return (
    <div className='flex flex-col items-center justify-center my-10'>
      <TableTweet dataTable={data as any} />
      <Pagination limit={limit || 10} pageSize={totalPage || 1} page={page || 1} pathname='tweets' />
    </div>
  )
}
