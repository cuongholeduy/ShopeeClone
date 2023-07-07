import { Link } from "react-router-dom"
import { StarIcon } from "@heroicons/react/24/solid"

import path from "src/constants/path"

export default function Product() {
  return (
    <Link to={path.home}>
      <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.25rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src="https://picsum.photos/200/300"
            alt="product"
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2">
          <div className="line-clamp-2 min-h-[2rem] text-xs">
            [HÀNG HIỆU] Thắt Lưng Da Nam Khoá Tự Động Cao Cấp Dây Nịt Năm Mắt Xoay Chính Hãng , Phong Cách Hàn Quốc -
            v77men
          </div>
          <div className="mt-3 flex items-center">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span>5.000</span>
            </div>
            <div className="ml-1 truncate text-orange">
              <span className="text-xs">₫</span>
              <span>2.000</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-start">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: "40%" }}>
                  <StarIcon className="h-3 w-3 text-yellow-400" />
                </div>
                <StarIcon className="h-3 w-3 text-gray-400" />
              </div>
            </div>
            <div className="ml-2 text-xs">
              <span>Đã bán</span>
              <span className="ml-1">5.67k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
