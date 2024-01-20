import { useContext, useEffect, useState } from 'react'
import PostItem from '../PostItem'
import axios from 'axios'
import config from 'src/constants/config'
import { AppContext } from 'src/contexts/app.context'

const LIMIT = 2
const PAGE = 1

export default function Feed() {
  const { profile } = useContext(AppContext)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    page: PAGE,
    total_page: 0
  })
  const user_id = profile?._id

  const fetchData = () => {
    axios
      .get(`tweets/list/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          limit: LIMIT,
          page: PAGE
        },
        baseURL: config.baseUrl
      })
      .then((res) => {
        const { tweets, page, total_page } = res.data.result
        console.log(res.data.result)

        setData(tweets)
        setPagination({
          page,
          total_page
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchMoreData = () => {
    axios
      .get(`tweets/list/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          limit: LIMIT,
          page: pagination.page
        },
        baseURL: config.baseUrl
      })
      .then((res) => {
        const { tweets, page, total_page } = res.data.result
        console.log(res.data.result)
        setData((prev) => [...prev, ...tweets] as any)
        setPagination({
          page,
          total_page
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlScroll = (e: Event) => {
    if (
      window.innerHeight + (e.target as Document).documentElement.scrollTop + 1 >=
      (e.target as Document).documentElement.scrollHeight
    ) {
      console.log(pagination.page)
      console.log(pagination.total_page)
      if (pagination.page <= pagination.total_page) {
        fetchMoreData()
      }
    }
  }

  useEffect(() => {
    fetchData()
    window.addEventListener('scroll', handlScroll)
    // return window.removeEventListener('scroll', handlScroll)
  }, [])

  return <>{data?.map((post: Record<string, any>, index) => <PostItem key={index} data={post as any} />)}</>
}
