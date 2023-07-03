import { ButtonHTMLAttributes } from "react"

import Spinner from "../Spinner"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button(props: Props) {
  const { className, isLoading, disabled, children, ...rest } = props
  const newClassname = disabled ? className + " cursor-not-allowed" : className
  return (
    <button className={newClassname} disabled={disabled} {...rest}>
      {isLoading && <Spinner className="mr-2 h-4 w-4 fill-white text-black" />}
      {children}
    </button>
  )
}
