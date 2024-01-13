export default function Header() {
  return (
    <div className='border-b bg-white sticky top-0 bg-opacity-90 cursor-pointer'>
      <div className='flex flex-row'>
        <div className='w-3/6 text-center p-4 hover:bg-slate-100 border-r'>
          <span className='text-slate-950'>For you</span>
        </div>
        <div className='w-3/6 text-center p-4 hover:bg-slate-100'>
          <span>Following</span>
        </div>
      </div>
    </div>
  )
}
