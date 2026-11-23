
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const formatPeso = (amount) =>
  `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
  } = useCart()

  const isCartEmpty = cartItems.length === 0

  return (
    <div className="min-h-screen w-full bg-[#f5f4ee]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-6">

        {/* Page Heading */}
        <div className="mb-4 flex flex-col justify-between gap-2 border-b border-[#c3c8c1] pb-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#1e3425] lg:text-3xl">
              Your Shopping Bag
            </h1>

            <p className="mt-0.5 text-sm text-[#424843]">
              {cartCount === 0
                ? 'Your shopping bag is currently empty.'
                : `${cartCount} eco-friendly ${
                    cartCount === 1 ? 'item' : 'items'
                  } ready for checkout`}
            </p>
          </div>
        </div>

        {/* Main Cart Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

          {/* Left Column: Cart Items */}
          <section className="flex flex-col gap-4 lg:col-span-8">

            {/* Cart Column Headings */}
            {!isCartEmpty && (
              <div className="hidden grid-cols-12 border-b border-[#c3c8c1] pb-2 text-xs font-medium uppercase tracking-wider text-[#737972] sm:grid">
                <div className="col-span-6">
                  Garment &amp; Composition
                </div>

                <div className="col-span-2 text-center">
                  Unit Price
                </div>

                <div className="col-span-2 text-center">
                  Quantity
                </div>

                <div className="col-span-2 text-right">
                  Subtotal
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="flex flex-col gap-3">

              {cartItems.map((item) => {
                const lineSubtotal = item.price * item.quantity

                return (
                  <article
                    key={item.id}
                    className="rounded-lg border border-[#c3c8c1] bg-white p-4 transition-all"
                  >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">

                      {/* Product Image */}
                      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-[#efeee9] sm:h-28 sm:w-24">
                        <img
                          src={item.image}
                          alt={item.alt || item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Information */}
                      <div className="min-w-0 flex-1">
                        {(item.cartBadge || item.sku) && (
                          <div className="mb-1 flex flex-wrap items-baseline gap-2">
                            {item.cartBadge && (
                              <span className="rounded bg-[#d5e4cb] px-2 py-0.5 text-xs font-medium text-[#586753]">
                                {item.cartBadge}
                              </span>
                            )}

                            {item.sku && (
                              <span className="text-xs text-[#737972]">
                                SKU: {item.sku}
                              </span>
                            )}
                          </div>
                        )}

                        <h2 className="truncate text-lg font-semibold text-[#1e3425]">
                          {item.name}
                        </h2>

                        {item.variantDescription && (
                          <p className="mt-0.5 text-sm text-[#424843]">
                            {item.variantDescription}
                          </p>
                        )}

                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#54624f]">
                          <span className="material-symbols-outlined text-[16px]">
                            {item.metaIcon || 'eco'}
                          </span>

                          <span>{item.material}</span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="flex w-full items-center justify-between border-t border-[#c3c8c1] pt-2 sm:w-24 sm:flex-col sm:justify-center sm:border-t-0 sm:pt-0">
                        <span className="text-xs text-[#737972] sm:hidden">
                          Unit Price
                        </span>

                        <span className="text-base text-[#1b1c19] sm:text-center">
                          {formatPeso(item.price)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex w-full items-center justify-between sm:w-auto sm:justify-center">
                        <span className="text-xs text-[#737972] sm:hidden">
                          Quantity
                        </span>

                        <div className="inline-flex items-center rounded border border-[#c3c8c1] bg-[#fbf9f4]">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#424843] transition-colors hover:bg-[#efeee9] hover:text-[#1e3425] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              remove
                            </span>
                          </button>

                          <span className="w-8 select-none text-center text-sm font-medium text-[#1b1c19]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center text-[#424843] transition-colors hover:bg-[#efeee9] hover:text-[#1e3425]"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              add
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Line Subtotal and Remove */}
                      <div className="flex w-full items-center justify-between border-t border-[#c3c8c1] pt-2 sm:w-24 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                        <span className="text-xs text-[#737972] sm:hidden">
                          Line Subtotal
                        </span>

                        <div className="flex flex-col items-end">
                          <span className="text-base font-semibold text-[#1e3425]">
                            {formatPeso(lineSubtotal)}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="mt-1 flex items-center gap-0.5 text-xs text-[#737972] transition-colors hover:text-red-700 hover:underline"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              delete
                            </span>

                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </article>
                )
              })}

              {/* Empty Cart State */}
              {isCartEmpty && (
                <div className="rounded-lg border border-[#c3c8c1] bg-white py-8 text-center">
                  <span className="material-symbols-outlined mb-2 text-4xl text-[#737972]">
                    shopping_bag
                  </span>

                  <p className="text-lg font-semibold text-[#1e3425]">
                    Your shopping bag is currently empty.
                  </p>

                  <p className="mt-1 text-sm text-[#424843]">
                    Explore our collection of honest, circular essentials.
                  </p>

                  <Link
                    to="/shop"
                    className="mt-4 inline-flex items-center gap-1.5 font-semibold text-[#1e3425] hover:underline"
                  >
                    <span>Return to Catalog</span>

                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Zero Waste Guarantee */}
            <div className="flex items-start gap-3.5 rounded-lg border border-[#c3c8c1] bg-[#efeee9] p-3.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#d5e4cb] text-[#1e3425]">
                <span className="material-symbols-outlined text-[18px]">
                  compost
                </span>
              </div>

              <div>
                <h3 className="text-[15px] font-semibold text-[#1e3425]">
                  Zero Waste Guarantee
                </h3>

                <p className="mt-0.5 text-[13px] leading-relaxed text-[#424843]">
                  All TerraWear textiles are completely dye-free or
                  naturally plant-tinted. Every stitch is documented
                  in our open-source supply chain ledger for collegiate
                  research and public review.
                </p>
              </div>
            </div>

          </section>

          {/* Right Column: Order Summary */}
          <aside className="lg:sticky lg:top-20 lg:col-span-4">
            <div className="rounded-lg border border-[#c3c8c1] bg-white p-5">

              {/* Summary Heading */}
              <h2 className="flex items-center justify-between border-b border-[#c3c8c1] pb-3 text-lg font-semibold text-[#1e3425]">
                <span>Order Summary</span>

                <span className="material-symbols-outlined text-xl text-[#54624f]">
                  receipt_long
                </span>
              </h2>

              {/* Summary Details */}
              <div className="flex flex-col gap-2 py-3 text-sm">

                <div className="flex items-center justify-between">
                  <span className="text-[#424843]">
                    Items Subtotal
                  </span>

                  <span className="font-medium text-[#1b1c19]">
                    {formatPeso(cartSubtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#424843]">
                    Shipping

                    <span
                      className="material-symbols-outlined text-[16px] text-[#54624f]"
                      title="Carbon Neutral Ground Transport"
                    >
                      local_shipping
                    </span>
                  </span>

                  <span className="font-medium text-[#1e3425]">
                    Free
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#424843]">
                    Estimated Eco-Tax
                  </span>

                  <span className="font-medium text-[#1b1c19]">
                    ₱0.00
                  </span>
                </div>

              </div>

              {/* Order Total */}
              <div className="my-2 border-t border-[#c3c8c1]" />

              <div className="flex items-baseline justify-between py-2.5">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1e3425]">
                    Order Total
                  </span>

                  <span className="text-xs text-[#737972]">
                    Taxes included where applicable
                  </span>
                </div>

                <span className="text-2xl font-semibold text-[#1e3425]">
                  {formatPeso(cartSubtotal)}
                </span>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-3.5 flex flex-col gap-2.5">

                {isCartEmpty ? (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded border border-[#344b3a] bg-[#344b3a] px-4 py-2.5 text-sm font-medium text-white opacity-50"
                  >
                    <span>Continue to Checkout</span>

                    <span className="material-symbols-outlined text-[18px]">
                      lock
                    </span>
                  </button>
                ) : (
                  <Link
                    to="/checkout"
                    className="flex w-full items-center justify-center gap-2 rounded border border-[#344b3a] bg-[#344b3a] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e3425]"
                  >
                    <span>Continue to Checkout</span>

                    <span className="material-symbols-outlined text-[18px]">
                      lock
                    </span>
                  </Link>
                )}

                <Link
                  to="/shop"
                  className="flex w-full items-center justify-center gap-1.5 py-1.5 text-sm font-medium text-[#54624f] transition-colors hover:text-[#1e3425]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_back
                  </span>

                  <span>Continue Shopping</span>
                </Link>

              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}

export default Cart
