import { InputHTMLAttributes } from "react"
import type { UseFormRegister, RegisterOptions } from "react-hook-form"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  className,
  placeholder,
  name,
  errorMessage,
  autoComplete,
  register,
  rules,
  classNameInput = "w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm",
  classNameError = "ml-1 mt-1 min-h-[1.25rem] text-sm text-red-600"
}: Props) {
  const registerResult = register && name ? register(name, rules) : null

  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
