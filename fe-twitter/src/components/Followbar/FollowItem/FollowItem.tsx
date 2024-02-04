import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button'

export default function FollowItem() {
  const handleClick = () => {}
  return (
    <div className='flex flex-row items-start gap-2 mt-2 hover:bg-slate-200 p-2'>
      <Avatar />
      <div className='flex flex-col flex-1 items-start gap-2'>
        <p className='text-black text-sm font-semibold cursor-pointer hover:underline'>Tran Anh Hao</p>
        <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@abcd</span>
      </div>
      <div className='flex flex-row items-end mr-0'>
        <Button label='Follow' secondary onClick={handleClick} />
      </div>
    </div>
  )
}
