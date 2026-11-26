import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageLayout from '../../components/PageLayout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getAllProductsApi } from '../../apis/products'
import { ProductType } from '../../modules/Products/types'

const CATEGORY_MAP: Record<string, string> = {
  raglan: 'Raglan T-Shirt',
  polo: 'Polo T-Shirt',
  vneck: 'V-Neck T-Shirt',
  tshirt: 'Plain T-Shirt',
}

const ProductCategory: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true)
  const { category } = useParams<{ category: string }>()

  const categoryName = CATEGORY_MAP[category?.toLowerCase() ?? '']
  //console.log('categoryName:', categoryName)
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProductsApi,
  })

  const filtered = products?.filter(
    (p: ProductType) => p.category?.name === categoryName
  )

  if (!categoryName) {
    return (
      <PageLayout>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">

        <div className="flex flex-1 min-h-screen items-center justify-center">
          <h1 className="text-2xl font-semibold">Category not found.</h1>
        </div>
        </main>
        <Footer />
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-8">{categoryName}</h1>

        {isError && (
          <p className="text-red-500">Something went wrong loading products.</p>
        )}

        {(isLoading || !products) && (
          <p className="text-gray-500">Just a sec…</p>
        )}

        {filtered && filtered.length === 0 && !isLoading && (
          <p className="text-gray-500">No products found in this category.</p>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          {filtered?.map((product: ProductType) => (
            <div key={product.id} className="group relative">
              <Link to={`/product/${product.id}`}>
                <img
                src={`../${product.image.image_url}`}
                alt={product.image?.image_alt}
                  className="h-45 w-auto rounded-2xl"
                />
                <h3 className="mt-4 text-sm">{product.description}</h3>
                <p className="mt-1 text-lg font-medium">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
 
      <Footer />
    </PageLayout>
  )
}

export default ProductCategory
