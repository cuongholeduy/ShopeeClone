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
  className,
  name,
  errorMessage,
  register,
  rules,
  classNameInput = "w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm",
  classNameError = "ml-1 mt-1 min-h-[1.25rem] text-sm text-red-600",
  ...rest
}: Props) {
  const registerResult = register && name ? register(name, rules) : null

  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
