import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export default function SortProductList() {
  return (
    <div className="bg-gray-300/40 px-3 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button className="h-8 bg-orange px-4 text-center text-sm capitalize text-white hover:bg-orange/80">
            Phổ biến
          </button>
          <button className="h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100">
            Mới nhất
          </button>
          <button className="h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100">
            Bán chạy
          </button>
          <select
            className="h-8 bg-white px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100"
            value=""
          >
            <option value="" disabled>
              Giá
            </option>
            <option value="price:asc">Giá thấp đến cao</option>
            <option value="price:desc">Giá cao đến thấp</option>
          </select>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-orange">1</span>
            <span>/2</span>
          </div>
          <div className="ml-2">
            <button className="h-8 cursor-not-allowed rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-300">
              <ChevronLeftIcon className="h-3 w-3" />
            </button>
            <button className="h-8 rounded-br-sm rounded-tr-sm bg-white px-3 shadow hover:bg-slate-300">
              <ChevronRightIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
