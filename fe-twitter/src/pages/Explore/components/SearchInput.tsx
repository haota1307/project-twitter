import { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Input from 'src/components/Input'

interface SearchInputProps {
  onFocusInput?: React.FocusEventHandler<HTMLDivElement>
}

export default function SearchInput({ onFocusInput }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className='max-w-lg mx-auto focus-within:w-full peer' onFocus={onFocusInput}>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500'>
          <IoSearchOutline color='' />
        </div>
        <Input name='Search' classNameOptionSearch placeholder='Search' />
      </div>
    </div>
  )
}
