import { Link } from "react-router-dom"

import path from "src/constants/path"
import { Product as ProductType } from "src/types/product.type"
import { formatCurrency, formatNumberToSocialStyle } from "src/utils/utils"

import ProductRating from "src/components/ProductRating"

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.25rem] hover:shadow-md">
        <div className="relative w-full pt-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute left-0 top-0 h-full w-full bg-white object-cover"
          />
        </div>
        <div className="overflow-hidden p-2">
          <div className="line-clamp-2 min-h-[2rem] text-xs">{product.name}</div>
          <div className="mt-3 flex items-center">
            <div className="max-w-[50%] truncate text-gray-500 line-through">
              <span className="text-xs">₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className="ml-1 truncate text-orange">
              <span className="text-xs">₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-start">
            <ProductRating rating={product.rating} />
            <div className="ml-2 text-xs">
              <span>Đã bán</span>
              <span className="ml-1">{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
