import Header from 'src/components/Header'
import SearchInput from './components/SearchInput'
import SearchResult from './components/SearchResult'

export default function Explore() {
  return (
    <>
      <div className='flex items-center'>
        <Header showBackArrow hiddenBorder />
        <div className='focus-within:w-full'>
          <SearchInput />
        </div>
      </div>
      <SearchResult />
    </>
  )
}
