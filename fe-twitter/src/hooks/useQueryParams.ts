import { useSearchParams } from 'react-router-dom'

// Lấy query params trên thanh url
export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
