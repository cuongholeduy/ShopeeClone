import { Link, createSearchParams, useNavigate } from "react-router-dom"
import classNames from "classnames"
import { ListBulletIcon, FunnelIcon } from "@heroicons/react/24/outline"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { omit } from "lodash"
import { ObjectSchema } from "yup"

import path from "src/constants/path"
import { QueryConfig } from "../../ProductList"
import { Category } from "src/types/category.type"
import { PriceSchema, priceSchema } from "src/utils/rules"
import { NoUndefinedField } from "src/types/utils.type"

import Button from "src/components/Button"
import NumberInput from "src/components/NumberInput"
import RatingStars from "../RatingStars"

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = NoUndefinedField<PriceSchema>

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: "",
      price_max: ""
    },
    resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAllFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ["price_min", "price_max", "rating_filter", "category"])).toString()
    })
  }

  return (
    <div className="py-4">
      <Link
        to={path.home}
        className={classNames("flex items-center font-bold", {
          "text-orange": !category
        })}
      >
        <ListBulletIcon className="mr-3 h-5 w-5 fill-current" />
        Tất cả danh mục
      </Link>
      <div className="my-4 h-[1px] bg-gray-400" />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id

          return (
            <li key={categoryItem._id} className="py-2 pl-2">
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames("relative px-2 hover:text-orange", {
                  "font-semibold text-orange": isActive
                })}
              >
                {isActive && (
                  <svg viewBox="0 0 4 7" className="absolute left-[-10px] top-[6px] h-2 w-2 fill-orange">
                    <polygon points="4 3.5 0 0 0 7" />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className="mt-6 flex items-center font-bold uppercase">
        <FunnelIcon className="mr-3 h-4 w-4" />
        Bộ lọc tìm kiếm
      </Link>
      <div className="my-4 h-[1px] bg-gray-400" />
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex items-start">
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <NumberInput
                    type="text"
                    className="grow"
                    placeholder="₫ TỪ"
                    classNameInput="w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger("price_max")
                    }}
                  />
                )
              }}
            />
            <div className="mx-2 mt-1 shrink-0">-</div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <NumberInput
                    type="text"
                    className="grow"
                    placeholder="₫ ĐẾN"
                    classNameInput="w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
                    classNameError="hidden"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger("price_min")
                    }}
                  />
                )
              }}
            />
          </div>
          <div className="ml-1 mt-1 min-h-[1.25rem] text-sm text-red-600">{errors.price_min?.message}</div>
          <Button className="flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80">
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="my-4 h-[1px] bg-gray-400" />
      <div className="text-sm">Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className="my-4 h-[1px] bg-gray-400" />
      <Button
        className="flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80"
        onClick={handleRemoveAllFilter}
      >
        Xoá tất cả
      </Button>
    </div>
  )
}
