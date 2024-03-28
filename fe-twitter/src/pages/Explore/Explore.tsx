import SearchResult from './components/SearchResult'
import { IoSearchOutline } from 'react-icons/io5'
import Input from 'src/components/Input'
import { useEffect, useState } from 'react'
import searchApi from 'src/apis/search.api'
import { useDebounce } from 'src/hooks/useDebounce'
import SkeletonLoading from 'src/components/SkeletonLoading'

export default function Explore() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResult, setSearchResult] = useState()
  const [isSearching, setIsSearching] = useState<Boolean>()
  const debouncedSearch = useDebounce(searchValue)

  const onSearch = async () => {
    setIsSearching(true)
    searchApi
      .searchTweet(debouncedSearch, 20, 1, 0)
      .then((data) => {
        setSearchResult(data.data.result.tweets)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSearching(false)
      })
  }

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.trim() === '') return

    // Kiểm tra nếu debouncedSearch chỉ chứa khoảng trắng
    const isWhitespace = /^\s*$/.test(debouncedSearch)
    if (isWhitespace) return

    onSearch()
  }, [debouncedSearch])

  console.log('searchResult', searchResult)
  console.log('isSearching', isSearching)

  return (
    <>
      <div className='flex items-center'>
        {/* <Header showBackArrow hiddenBorder label='Search' /> */}
        <div className='focus-within:w-full mt-2'>
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
        </div>
      </div>
      {isSearching ? <SkeletonLoading /> : <SearchResult data={searchResult} />}
    </>
  )
}
