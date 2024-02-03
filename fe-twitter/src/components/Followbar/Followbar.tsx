import Avatar from '../Avatar'
import Button from '../Button'

export default function Followbar() {
  const handleClick = () => {}
  return (
    <>
      <div className='pl-6 py-4 hidden lg:block'>
        <div className='bg-slate-100 rounded-xl top-4 sticky pb-2.5'>
          <h2 className='text-slate-600 text-xl font-semibold p-2'>Who to follow</h2>
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
        </div>
      </div>
    </>
  )
}
