import { useContext } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "react-query"
import { GlobeAltIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

import { logout } from "src/apis/auth.api"
import { AppContext } from "src/contexts/app.context"
import path from "src/constants/path"

import LogoIcon from "../LogoIcon"
import Popover from "../Popover"

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

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
          <form className="col-span-9 w-full">
            <div className="flex rounded-sm bg-white p-1">
              <input
                type="text"
                name="search"
                placeholder="Tìm kiếm sản phẩm"
                className="flex-grow border-none bg-transparent px-3 py-2 text-black outline-none"
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
                  <div className="p-2">
                    <div className="capitalize text-gray-400">Sản phẩm mới thêm</div>
                    <div className="mt-5">
                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img src="https://picsum.photos/200/300" alt="product" className="h-11 w-11 object-cover" />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24cm
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-orange">₫469.000</span>
                        </div>
                      </div>
                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img src="https://picsum.photos/200/300" alt="product" className="h-11 w-11 object-cover" />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24cm
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-orange">₫469.000</span>
                        </div>
                      </div>
                      <div className="mt-4 flex">
                        <div className="flex-shrink-0">
                          <img src="https://picsum.photos/200/300" alt="product" className="h-11 w-11 object-cover" />
                        </div>
                        <div className="ml-2 flex-grow overflow-hidden">
                          <div className="truncate">
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24cm
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className="text-orange">₫469.000</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-xs capitalize text-gray-400">Thêm hàng vào giỏ</div>
                      <button className="rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-80">
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to="/">
                <ShoppingCartIcon className="h-8 w-8" />
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
