import { useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

interface PopoverProps {
  item: {
    name: string
    onClick?: () => void
  }[]
}

export default function Popover({ item }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const menuPopover = [...item]

  return (
    <>
      <div className='relative'>
        <button className='cursor-pointer focus:bg-slate-100 p-2 rounded-full' onClick={() => setOpen(!open)}>
          <IoSettingsOutline size={28} />
        </button>
        {open && (
          <div className='bg-white m-2 w-52 shadow-xl absolute -left-44 z-50'>
            <ul>
              {menuPopover.map((item, index) => (
                <li className='p-2 text-base cursor-pointer hover:bg-slate-100 rounded' key={index}>
                  <button onClick={item.onClick}>{item.name}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
