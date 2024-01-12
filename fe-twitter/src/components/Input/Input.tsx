interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  onChange: () => React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({ placeholder, value, type, disabled, onChange }: InputProps) {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className='w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-sm outline-none text-white focus:border-sky-500 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed'
    ></input>
  )
}
