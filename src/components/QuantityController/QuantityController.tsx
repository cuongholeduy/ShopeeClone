import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"

import NumberInput, { NumberInputProps } from "../NumberInput"

interface Props extends NumberInputProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper = "ml-10",
  onType,
  value,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)

    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value) + 1

    if (max !== undefined && _value > max) {
      _value = max
    }

    onIncrease && onIncrease(_value)
  }

  const handleDecrease = () => {
    let _value = Number(value) - 1

    if (_value < 1) {
      _value = 1
    }

    onDecrease && onDecrease(_value)
  }

  return (
    <div className={`flex items-center ${classNameWrapper}`}>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600"
        onClick={handleDecrease}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <NumberInput
        classNameError="hidden"
        classNameInput="h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none"
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <button
        className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600"
        onClick={handleIncrease}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
