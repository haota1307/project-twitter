import classNames from 'classnames'
import { useCallback, useState } from 'react'
import SearchUserItem from './SearchUserItem'
import SearchTweetItem from './SearchTweetItem'

interface SearchResultProps {
  data?: string[]
}

export default function SearchResult({ data }: SearchResultProps) {
  const [isActiveTweetBtn, setIsActiveTweet] = useState<Boolean>(true)
  const [isActiveUserBtn, setIsActiveUserBtn] = useState<Boolean>(false)

  const activeTweetBtn = useCallback(() => {
    if (!isActiveTweetBtn) {
      setIsActiveTweet(true)
      setIsActiveUserBtn(false)
    }
  }, [isActiveTweetBtn, isActiveUserBtn])

  const activeUserBtn = useCallback(() => {
    if (isActiveTweetBtn) {
      setIsActiveTweet(false)
      setIsActiveUserBtn(true)
    }
  }, [isActiveTweetBtn, isActiveUserBtn])

  return (
    <>
      <div className='mt-2'>
        <div className='text-xl font-semibold px-8 py-2.5 text-gray-400 flex justify-evenly border-b border-t'>
          <button
            onClick={activeTweetBtn}
            className={classNames('cursor-pointer w-full', {
              'text-blue-400 cursor-default': isActiveTweetBtn,
              'text-gray-400': !isActiveTweetBtn
            })}
          >
            Tweet
          </button>
          <div className='border-l'></div>
          <button
            onClick={activeUserBtn}
            className={classNames('cursor-pointer w-full', {
              'text-blue-400 cursor-default': isActiveUserBtn,
              'text-gray-400': !isActiveUserBtn
            })}
          >
            User
          </button>
        </div>
        {isActiveTweetBtn ? <SearchTweetItem data={data} /> : <SearchUserItem />}
      </div>
    </>
  )
}
