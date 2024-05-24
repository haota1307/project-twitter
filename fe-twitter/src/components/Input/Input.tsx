import { InputHTMLAttributes, useState } from 'react'
import type { UseFormRegister, RegisterOptions, FieldValues, FieldPath } from 'react-hook-form'

interface CustomInputHTMLAttributes<T> extends InputHTMLAttributes<T> {
  type?: string
}

interface InputProps<TFieldValues extends FieldValues> extends CustomInputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  hidden?: boolean
  value?: string
  register?: UseFormRegister<TFieldValues>
  errorMessage?: string
  disabled?: boolean
  name: FieldPath<TFieldValues>
  rules?: RegisterOptions
  classNameOptionSearch?: boolean
  classNameEye?: string
}

export default function Input<TFieldValues extends FieldValues>({
  placeholder,
  name,
  hidden,
  register,
  value,
  type,
  disabled,
  rules,
  onChange,
  errorMessage,
  classNameOptionSearch,
  classNameEye = 'absolute bottom-[12px] right-[16px] h-5 w-5 cursor-pointer text-slate-600',
  ...rest
}: InputProps<TFieldValues>) {
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null

  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const handleType = () => {
    if (type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return type
  }

  return (
    <div className='flex flex-col justify-center w-full my-1.5'>
      <div className={`relative w-full h-auto px-1 ${hidden && 'hidden'} `}>
        <input
          {...rest}
          {...registerResult}
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={handleType()}
          className={`${
            classNameOptionSearch
              ? `peer block w-full p-2.5 ps-10 bg-white border-2 rounded-3xl outline-none text-slate-600 focus:bg-blue-50 focus:border-blue-100 transition disabled:bg-blue-200 disabled:cursor-not-allowed`
              : `h-auto lg:p-2 p-1.5 text-lg bg-white border-2 rounded-sm outline-none text-slate-600 focus:bg-blue-50 focus:border-blue-100 transition disabled:bg-blue-200 disabled:cursor-not-allowed w-full`
          }`}
        />
        {type === 'password' && openEye && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNameEye}
            onClick={toggleEye}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        )}
        {type === 'password' && !openEye && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNameEye}
            onClick={toggleEye}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
            />
          </svg>
        )}
      </div>
      <p className='ml-1.5 mt-1 text-red-600 text-sm text-left'>{errorMessage}</p>
    </div>
  )
}
