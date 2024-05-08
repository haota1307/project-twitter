import SearchResult from './components/SearchResult'
import { IoSearchOutline } from 'react-icons/io5'
import Input from 'src/components/Input'
import { useEffect, useState } from 'react'
import searchApi from 'src/apis/search.api'
import { useDebounce } from 'src/hooks/useDebounce'
import SkeletonLoading from 'src/components/SkeletonLoading'
import Header from 'src/components/Header'
import { useLocation } from 'react-router-dom'

export default function Explore() {
  const location = useLocation()
  const { searchHashtag } = location.state || {}
  const [searchValue, setSearchValue] = useState<string>(searchHashtag || '')
  const [searchTweetResult, setSearchTweetResult] = useState()
  const [searchUserResult, setSearchUserResult] = useState()
  const [isSearching, setIsSearching] = useState<boolean>()

  const debouncedSearch = useDebounce(searchValue)

  const onSearchTweet = async () => {
    setIsSearching(true)
    searchApi
      .searchTweet(debouncedSearch, 20, 1, 0)
      .then((data) => {
        setSearchTweetResult(data.data.result.tweets)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSearching(false)
      })
  }

  const onSearchUser = async () => {
    setIsSearching(true)
    searchApi
      .searchUser(debouncedSearch, 20, 1)
      .then((data) => {
        setSearchUserResult(data.data.result.user)
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
    onSearchTweet()
    if (!searchHashtag) onSearchUser()
  }, [debouncedSearch])

  console.log(searchHashtag)

  return (
    <>
      <div className='flex items-center'>
        <Header hiddenBorder showBackArrow />
        <div className='w-full mt-2'>
          <div className='max-w-lg mx-auto'>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500'>
                <IoSearchOutline color='' />
              </div>
              <Input
                name='Search'
                placeholder='Search'
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                classNameOptionSearch
              />
            </div>
          </div>
        </div>
      </div>
      {isSearching ? <SkeletonLoading /> : <SearchResult dataTweet={searchTweetResult} dataUser={searchUserResult} />}
    </>
  )
}
