import classNames from 'classnames'
import SearchItem from './SearchItem'
import { useCallback, useState } from 'react'

export default function SearchResult() {
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
      <div className=''>
        <div className='text-2xl font-semibold px-5'>
          <span>Result for search</span>
        </div>
        {/* <div className='mt-12 text-gray-400 flex items-center justify-center'>
          Ohh no!! The results you were looking for were not found
        </div> */}
        <div className='text-xl font-semibold px-8 text-gray-400 flex justify-center gap-3'>
          <button
            onClick={activeTweetBtn}
            className={classNames('cursor-pointer', {
              'text-blue-400 cursor-default': isActiveTweetBtn,
              'text-gray-400': !isActiveTweetBtn
            })}
          >
            Tweet
          </button>
          <div className='border-l'></div>
          <button
            onClick={activeUserBtn}
            className={classNames('cursor-pointer', {
              'text-blue-400 cursor-default': isActiveUserBtn,
              'text-gray-400': !isActiveUserBtn
            })}
          >
            User
          </button>
        </div>
        {isActiveTweetBtn ? '' : <SearchItem />}
      </div>
    </>
  )
}
