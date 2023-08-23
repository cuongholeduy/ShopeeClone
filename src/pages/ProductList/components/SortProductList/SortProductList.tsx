import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { Link, createSearchParams, useNavigate } from "react-router-dom"
import { omit } from "lodash"

import { sortBy, order as orderConst } from "src/constants/product"
import { ProductListConfig } from "src/types/product.type"
import path from "src/constants/path"
import { QueryConfig } from "src/hooks/useQueryConfig"

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const navigate = useNavigate()
  const currentPage = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig["sort_by"], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig["sort_by"], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ["order"]
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig["order"], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className="bg-gray-300/40 px-3 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(sortBy.view),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(sortBy.createdAt),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(sortBy.sold),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames("h-8 px-4 text-left text-sm capitalize outline-none", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(sortBy.price),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.price)
            })}
            value={order || ""}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig["order"], undefined>)}
          >
            <option value="" disabled className="bg-white text-black">
              Giá
            </option>
            <option value={orderConst.asc} className="bg-white text-black">
              Giá thấp đến cao
            </option>
            <option value={orderConst.desc} className="bg-white text-black">
              Giá cao đến thấp
            </option>
          </select>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-orange">{currentPage}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="ml-2 flex">
            {currentPage === 1 ? (
              <span className="flex h-8 cursor-not-allowed items-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow">
                <ChevronLeftIcon className="h-3 w-3" />
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage - 1).toString()
                  }).toString()
                }}
                className="flex h-8 items-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-300"
              >
                <ChevronLeftIcon className="h-3 w-3" />
              </Link>
            )}
            {currentPage === pageSize ? (
              <span className="flex h-8 cursor-not-allowed items-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow">
                <ChevronRightIcon className="h-3 w-3" />
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (currentPage + 1).toString()
                  }).toString()
                }}
                className="flex h-8 items-center rounded-bl-sm rounded-tl-sm bg-white px-3 shadow hover:bg-slate-300"
              >
                <ChevronRightIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
