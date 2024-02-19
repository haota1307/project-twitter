import { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, FieldPath, RegisterOptions } from 'react-hook-form'

interface InputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  value?: string
  type?: string
  register?: UseFormRegister<TFieldValues>
  errorMessage?: string
  disabled?: boolean
  name: FieldPath<TFieldValues>
  rules?: RegisterOptions
}

export default function Input<TFieldValues extends FieldValues>({
  placeholder,
  name,
  register,
  value,
  type,
  disabled,
  rules,
  onChange,
  errorMessage,
  ...rest
}: InputProps<TFieldValues>) {
  const registerResult = register && name ? register(name, rules) : null

  return (
    <>
      <div className='w-full h-auto px-1'>
        <input
          {...rest}
          {...registerResult}
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className={`
            h-auto lg:p-2 p-1.5 text-lg bg-white border-2 rounded-sm outline-none text-black focus:bg-blue-50 focus:border-blue-100 transition disabled:bg-blue-200 disabled:cursor-not-allowed
            w-full
          `}
        ></input>
        <div className='ml-2 mt-1 text-red-600 text-sm text-left'>{errorMessage}</div>
      </div>
    </>
  )
}
