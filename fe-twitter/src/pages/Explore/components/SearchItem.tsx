import Avatar from 'src/components/Avatar'

export default function SearchItem() {
  return (
    <div className='px-5 p-2 '>
      <div className='flex flex-row items-start gap-2 mt-2 hover:bg-slate-200 p-2 rounded-md'>
        <div>
          <Avatar />
        </div>
        <div className='flex flex-col flex-1 items-start gap-2 truncate'>
          <div className='text-black text-sm font-semibold cursor-pointer hover:underline'>Tran Anh Hao</div>
          <div className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@trananhhao</div>
        </div>
      </div>
    </div>
  )
}
