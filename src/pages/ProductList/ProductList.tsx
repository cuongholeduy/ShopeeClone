import { useQuery } from "react-query"

import productApi from "src/apis/product.api"
import { ProductListConfig } from "src/types/product.type"
import categoryApi from "src/apis/category.api"
import useQueryConfig, { QueryConfig } from "src/hooks/useQueryConfig"

import AsideFilter from "./components/AsideFilter"
import Product from "./components/Product"
import SortProductList from "./components/SortProductList"
import Pagination from "src/components/Pagination"

export default function ProductList() {
  const queryConfig: QueryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        {productsData && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            <div className="col-span-9">
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {productsData.data.data.products.map((product) => {
                  return (
                    <div className="col-span-1" key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
