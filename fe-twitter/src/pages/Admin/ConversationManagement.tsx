import { useEffect, useState } from 'react'
import config from 'src/constants/config'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/pages/Admin/Components/Pagination'
import TableConversation from 'src/pages/Admin/Components/TableConversation'
import http from 'src/utils/http'

export default function ConversationManagement() {
  const param = useQueryParams()
  const [limit, setLimit] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [data, setData] = useState()

  useEffect(() => {
    const fectchData = async () => {
      try {
        const response = await http.get('admin/conversation', {
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
        console.log(result)
        if (result) {
          setData(result?.messagesContainingSensitiveWords)
          setLimit(result.pagination.totalItems)
          setPage(result.pagination.currentPage)
          setTotalPage(result.pagination.totalPages)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fectchData()
  }, [param.page])

  console.log(data)
  console.log(totalPage)

  return (
    <div className='flex flex-col items-center justify-center my-10'>
      <TableConversation dataTable={data as any} />
      <Pagination limit={limit || 1} pageSize={totalPage || 1} page={page || 1} pathname='conversations' />
    </div>
  )
}
