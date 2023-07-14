import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"
import { createSearchParams, useNavigate } from "react-router-dom"

import path from "src/constants/path"
import { QueryConfig } from "../../ProductList"

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStars({ queryConfig }: Props) {
  const navigate = useNavigate()

  const handleFilterRatingStars = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }

  return (
    <ul className="my-3">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <li key={index} className="cursor-pointer py-1 pl-2">
              <div
                className="flex items-center text-sm"
                tabIndex={0}
                role="button"
                aria-hidden="true"
                onClick={() => handleFilterRatingStars(5 - index)}
              >
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (indexStar < 5 - index) {
                      return <StarIconSolid key={indexStar} className="mr-1 h-5 w-5 text-yellow-400" />
                    }
                    return <StarIconOutline key={indexStar} className="mr-1 h-5 w-5 text-yellow-400" />
                  })}
                {index !== 0 && <span>trở lên</span>}
              </div>
            </li>
          )
        })}
    </ul>
  )
}
