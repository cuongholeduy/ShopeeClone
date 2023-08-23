import { useContext } from "react"
import { Link, createSearchParams, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { GlobeAltIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { omit } from "lodash"

import authApi from "src/apis/auth.api"
import { AppContext } from "src/contexts/app.context"
import path from "src/constants/path"
import useQueryConfig, { QueryConfig } from "src/hooks/useQueryConfig"
import { SearchSchema, searchSchema } from "src/utils/rules"
import { purchasesStatus } from "src/constants/purchase"
import purchaseApi from "src/apis/purchase.api"
import { formatCurrency } from "src/utils/utils"

import LogoIcon from "../LogoIcon"
import Popover from "../Popover"

type FormData = SearchSchema
const MAX_ITEMS_IN_CART = 5

export default function Header() {
  const navigate = useNavigate()
  const queryConfig: QueryConfig = useQueryConfig()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      product_search: ""
    },
    resolver: yupResolver(searchSchema)
  })
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.product_search
          },
          ["order", "sort_by"]
        )
      : {
          ...queryConfig,
          name: data.product_search
        }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <div className="bg-gradient-to-b from-[#f53d2d] to-[#f63] pb-5 pt-2 text-white">
      <div className="container">
        <div className="flex justify-end">
          <Popover
            className="flex cursor-pointer items-center py-1 hover:text-gray-300"
            renderPopover={
              <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
                <div className="flex flex-col py-2 pl-3 pr-28">
                  <button className="px-3 py-2 text-left hover:text-orange">Tiếng Việt</button>
                  <button className="px-3 py-2 text-left hover:text-orange">English</button>
                </div>
              </div>
            }
          >
            <GlobeAltIcon className="h-5 w-5" />
            <span className="mx-1">Tiếng Việt</span>
            <ChevronDownIcon className="h-5 w-5" />
          </Popover>
          {isAuthenticated && (
            <Popover
              className="ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300"
              renderPopover={
                <div className="relative rounded-sm border border-gray-200 bg-white shadow-md">
                  <Link
                    to={path.profile}
                    className="block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500"
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to={path.home}
                    className="block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500"
                  >
                    Đơn mua
                  </Link>
                  <button
                    className="block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className="mr-2 h-6 w-6 flex-shrink-0">
                <img
                  src="https://picsum.photos/200/300"
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>{profile?.email}</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className="ml-3 flex items-center">
              <Link to={path.register} className="mx-3 capitalize hover:text-white/70">
                Đăng ký
              </Link>
              <div className="h-4 border-r-[1px] border-r-white/40" />
              <Link to={path.login} className="mx-3 capitalize hover:text-white/70">
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-12 items-center justify-items-center gap-4">
          <Link to={path.home} className="col-span-2">
            <LogoIcon className="h-11 w-full fill-white" />
          </Link>
          <form className="col-span-9 w-full" onSubmit={onSubmitSearch}>
            <div className="flex rounded-sm bg-white p-1">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
                {...register("product_search")}
              />
              <button className="flex-shrink-0 rounded-sm bg-orange px-6 py-2 hover:opacity-80">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
          <div className="col-span-1">
            <Popover
              renderPopover={
                <div className="relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md">
                  {purchasesInCart ? (
                    <div className="p-2">
                      <div className="capitalize text-gray-400">Sản phẩm mới thêm</div>
                      <div className="mt-5">
                        {purchasesInCart.slice(0, MAX_ITEMS_IN_CART).map((purchase) => {
                          return (
                            <div className="mt-2 flex py-2 hover:bg-gray-100" key={purchase._id}>
                              <div className="flex-shrink-0">
                                <img
                                  src={purchase.product.image}
                                  alt={purchase.product.name}
                                  className="h-11 w-11 object-cover"
                                />
                              </div>
                              <div className="ml-2 flex-grow overflow-hidden">
                                <div className="truncate">{purchase.product.name}</div>
                              </div>
                              <div className="ml-2 flex-shrink-0">
                                <span className="text-orange">₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="text-xs capitalize text-gray-400">
                          {purchasesInCart.length > MAX_ITEMS_IN_CART ? purchasesInCart.length - MAX_ITEMS_IN_CART : ""}{" "}
                          Thêm hàng vào giỏ
                        </div>
                        <button className="rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-80">
                          Xem giỏ hàng
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2">Không có sản phẩm nào</div>
                  )}
                </div>
              }
            >
              <Link to="/">
                <ShoppingCartIcon className="h-8 w-8" />
                <span className="absolute left-[17px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange">
                  {purchasesInCart?.length}
                </span>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
