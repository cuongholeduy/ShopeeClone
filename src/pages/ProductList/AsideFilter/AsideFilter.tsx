import { Link } from "react-router-dom"
import { ListBulletIcon, FunnelIcon, StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"

import path from "src/constants/path"

import Input from "src/components/Input"
import Button from "src/components/Button"

export default function AsideFilter() {
  return (
    <div className="py-4">
      <Link to={path.home} className="flex items-center font-bold">
        <ListBulletIcon className="mr-3 h-5 w-5 fill-current" />
        Tất cả danh mục
      </Link>
      <div className="my-4 h-[1px] bg-gray-400" />
      <ul>
        <li className="py-2 pl-2">
          <Link to={path.home} className="relative px-2 font-semibold text-orange">
            <svg viewBox="0 0 4 7" className="absolute left-[-10px] top-[6px] h-2 w-2 fill-orange">
              <polygon points="4 3.5 0 0 0 7" />
            </svg>
            Thời trang nam
          </Link>
        </li>
        <li className="py-2 pl-2">
          <Link to={path.home} className="relative px-2">
            Điện thoại
          </Link>
        </li>
      </ul>
      <Link to={path.home} className="mt-6 flex items-center font-bold uppercase">
        <FunnelIcon className="mr-3 h-4 w-4" />
        Bộ lọc tìm kiếm
      </Link>
      <div className="my-4 h-[1px] bg-gray-400" />
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2">
          <div className="flex items-start">
            <Input
              type="text"
              className="grow"
              name="from"
              placeholder="₫ TỪ"
              classNameInput="w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
            />
            <div className="mx-2 mt-1 shrink-0">-</div>
            <Input
              type="text"
              className="grow"
              name="to"
              placeholder="₫ ĐẾN"
              classNameInput="w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm"
            />
          </div>
          <Button className="flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80">
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="my-4 h-[1px] bg-gray-400" />
      <div className="text-sm">Đánh giá</div>
      <ul className="my-3">
        <li className="py-1 pl-2">
          <Link to={path.home} className="flex items-center text-sm">
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return <StarIconSolid key={index} className="mr-1 h-5 w-5 text-yellow-400" />
              })}
            <span>trở lên</span>
          </Link>
        </li>
      </ul>
      <div className="my-4 h-[1px] bg-gray-400" />
      <Button className="flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80">
        Xoá tất cả
      </Button>
    </div>
  )
}
