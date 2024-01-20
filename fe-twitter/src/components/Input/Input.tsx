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
      <input
        {...rest}
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className='w-full h-auto lg:p-2.5 p-1.5 text-lg bg-white border-2 border-blue-700 rounded-sm outline-none text-black focus:bg-blue-50 transition disabled:bg-blue-200 disabled:cursor-not-allowed'
      ></input>
      <div className='ml-2 text-red-600 min-h-1 text-sm text-left'>{errorMessage}</div>
    </>
  )
}
