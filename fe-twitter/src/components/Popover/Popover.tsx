import { useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

interface PopoverProps {
  item: {
    name: string
    onClick?: () => void
    disabled?: boolean
  }[]
}

export default function Popover({ item }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const menuPopover = [...item]

  return (
    <>
      <div className='relative'>
        <button className='cursor-pointer hover:bg-slate-100 p-2 rounded-full' onClick={() => setOpen(!open)}>
          <IoSettingsOutline size={28} />
        </button>
        {open && (
          <div className='bg-white m-2 w-52 shadow-2xl shadow-blue-300 absolute -left-44 z-50'>
            <ul>
              {menuPopover.map((item, index) => (
                <li
                  className={`p-2 text-base cursor-pointer hover:bg-slate-100 rounded ${
                    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  key={index}
                >
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`${item.disabled && 'cursor-not-allowed'} `}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
