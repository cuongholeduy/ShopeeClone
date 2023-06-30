import { Link } from "react-router-dom"
import { GlobeAltIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"

import LogoIcon from "../LogoIcon"

export default function Header() {
  return (
    <div className="bg-gradient-to-b from-[#f53d2d] to-[#f63] pb-5 pt-2 text-white">
      <div className="container">
        <div className="flex justify-end">
          <div className="flex cursor-pointer items-center py-1 hover:text-gray-300">
            <GlobeAltIcon className="h-5 w-5" />
            <span className="mx-1">Tiếng Việt</span>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
          <div className="ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300">
            <div className="mr-2 h-6 w-6 flex-shrink-0">
              <img
                src="https://picsum.photos/200/300"
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>Cuong Ho</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-12 items-center justify-items-center gap-4">
          <Link to="/" className="col-span-2">
            <LogoIcon className="h-11 fill-white" />
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
            <Link to="/">
              <ShoppingCartIcon className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
