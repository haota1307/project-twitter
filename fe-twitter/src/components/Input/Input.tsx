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
        {...registerResult}
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className='w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-sm outline-none text-white focus:border-sky-500 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed'
      ></input>
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-left'>{errorMessage}</div>
    </>
  )
}