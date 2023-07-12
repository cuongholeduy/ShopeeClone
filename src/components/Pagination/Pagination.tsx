import classNames from "classnames"
import { Link, createSearchParams } from "react-router-dom"

import { QueryConfig } from "src/pages/ProductList/ProductList"
import path from "src/constants/path"

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const currentPage = Number(queryConfig.page)

  const renderPagiation = () => {
    let dotBefore = false
    let dotAfter = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true

        return (
          <span key={index} className="mx-2 rounded border bg-white px-3 py-2 shadow-sm">
            ...
          </span>
        )
      }

      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true

        return (
          <span key={index} className="mx-2 rounded border bg-white px-3 py-2 shadow-sm">
            ...
          </span>
        )
      }

      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (currentPage >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames("mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm", {
              "border-cyan-500": pageNumber === currentPage,
              "border-transparent": pageNumber !== currentPage
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className="mt-6 flex flex-wrap justify-center">
      {currentPage === 1 ? null : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
        >
          Prev
        </Link>
      )}
      {renderPagiation()}
      {currentPage === pageSize ? null : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className="mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm"
        >
          Next
        </Link>
      )}
    </div>
  )
}
