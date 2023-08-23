import { StarIcon } from "@heroicons/react/24/solid"

interface Props {
  rating: number
  activeClassname?: string
  noneActiveClassname?: string
}

export default function ProductRating({
  rating,
  activeClassname = "h-3 w-3 text-yellow-400",
  noneActiveClassname = "h-3 w-3 text-gray-400"
}: Props) {
  const handleWidth = (order: number) => {
    if (order < rating) {
      return "100%"
    }

    if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + "%"
    }

    return "0%"
  }

  return (
    <div className="flex items-center">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="relative" key={index}>
              <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: handleWidth(index + 1) }}>
                <StarIcon className={activeClassname} />
              </div>
              <StarIcon className={noneActiveClassname} />
            </div>
          )
        })}
    </div>
  )
}
