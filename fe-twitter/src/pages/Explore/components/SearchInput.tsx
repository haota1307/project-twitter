import { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import searchApi from 'src/apis/search.api'
import Input from 'src/components/Input'
import { useDebounce } from 'src/hooks/useDebounce'

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [, setSearchResult] = useState()
  const debouncedSearch = useDebounce(searchValue)

  const onSearch = async () => {
    await searchApi
      .searchTweet(debouncedSearch, 20, 1, 0)
      .then((data) => {
        // console.log(data.data.result.tweets)
        setSearchResult(data.data.result.tweets)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.trim() === '') return
    // Kiểm tra nếu debouncedSearch chỉ chứa khoảng trắng
    const isWhitespace = /^\s*$/.test(debouncedSearch)
    if (isWhitespace) return

    onSearch()
  }, [debouncedSearch])

  return (
    <div className='max-w-lg mx-auto'>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500'>
          <IoSearchOutline color='' />
        </div>
        <Input
          name='Search'
          placeholder='Search'
          onChange={(e) => setSearchValue(e.target.value)}
          classNameOptionSearch
        />
      </div>
    </div>
  )
}
