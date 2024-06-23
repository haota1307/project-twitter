import { useEffect, useState } from 'react'
import config from 'src/constants/config'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/pages/Admin/Components/Pagination'
import TableUsers from 'src/pages/Admin/Components/TableUsers'
import http from 'src/utils/http'

export default function UserManagement() {
  const param = useQueryParams()
  const [users, setUsers] = useState([])
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get('admin/users', {
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
          setUsers(result.users)
          setLimit(result.limit)
          setPage(result.page)
          setTotalPage(result.total_page)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [param.page])

  console.log(totalPage)
  return (
    <div className='flex flex-col items-center justify-center my-10'>
      <TableUsers dataTable={users as any} />
      <Pagination limit={limit || 10} pageSize={totalPage || 1} page={page || 1} pathname='users' />
    </div>
  )
}
