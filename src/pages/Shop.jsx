
import { useState } from 'react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const categories = [
  { label: 'All Items (4)', value: 'all' },
  { label: 'Tops', value: 'tops' },
  { label: 'Knitwear', value: 'knitwear' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Outerwear', value: 'outerwear' },
]

function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [addedProduct, setAddedProduct] = useState(null)

  const { addToCart } = useCart()

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        )

  const handleAddToCart = (product) => {
    addToCart(product)

    setAddedProduct(product.id)

    setTimeout(() => {
      setAddedProduct(null)
    }, 1500)
  }

  return (
    <div className="w-full bg-[#f5f4ee]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-6">

        {/* Intro Section */}
        <section className="mb-6 max-w-2xl">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#1e3425] sm:text-4xl">
            Sustainable Essentials for Mindful Living
          </h1>

          <p className="text-base leading-relaxed text-[#424843] sm:text-lg">
            Consciously crafted garments made from certified organic
            cotton, recycled wool, hemp linen, and bamboo fibers.
            Designed with care for everyday comfort.
          </p>
        </section>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.value

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className={`inline-flex items-center rounded px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
                  isActive
                    ? 'bg-[#344b3a] text-white'
                    : 'bg-white text-[#1b1c19] hover:bg-[#e9e8e3]'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        {/* Product Grid */}
        <section
          aria-label="Product catalog"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {filteredProducts.map((product) => {
            const isAdded = addedProduct === product.id

            return (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden bg-[#efeee9]">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div className="flex flex-col">
                    <span className="mb-1 text-xs font-medium uppercase tracking-wider text-[#54624f]">
                      {product.material}
                    </span>

                    <h2 className="mb-2 text-lg font-semibold leading-snug text-[#1e3425]">
                      {product.name}
                    </h2>

                    <div className="text-base font-medium text-[#1b1c19]">
                      {product.priceLabel}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="mt-6 border-t border-[#c3c8c1]/40 pt-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded px-4 py-2.5 text-sm font-medium text-white transition-colors ${
                        isAdded
                          ? 'bg-[#54624f]'
                          : 'bg-[#344b3a] hover:bg-[#1e3425]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isAdded ? 'check' : 'shopping_bag'}
                      </span>

                      <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        {/* Craftsmanship and Traceability */}
        <section className="mt-10 flex flex-col items-start justify-between gap-4 rounded-lg bg-[#e9e8e3]/60 p-6 sm:flex-row sm:items-center">

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-[#1e3425]">
              eco
            </span>

            <div>
              <h3 className="text-base font-semibold text-[#1e3425]">
                Honest Materials &amp; Fair Sourcing
              </h3>

              <p className="text-sm text-[#424843]">
                Every fiber is spun without toxic chemicals, pesticides,
                or petroleum-based synthetics.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#424843]">
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#1e3425]">
                verified
              </span>
              Carbon-Offset Delivery
            </span>

            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#1e3425]">
                recycling
              </span>
              Circular Lifecycles
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Shop
