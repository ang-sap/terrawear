
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const formatPeso = (amount) =>
  `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

function Checkout() {
  const { cartItems, cartCount, cartSubtotal } = useCart()

  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [customerName, setCustomerName] = useState('')

  const shippingCost = deliveryMethod === 'express' ? 250 : 0
  const totalAmount = cartSubtotal + shippingCost

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    setCustomerName(formData.get('fullName'))
    setOrderPlaced(true)
  }

  return (
    <div className="min-h-screen w-full bg-[#f5f4ee]">

      {/* Checkout Progress */}
      <div className="w-full bg-[#f5f4ee] py-4">
        <nav
          aria-label="Checkout Progress"
          className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 text-sm font-medium"
        >
          <Link
            to="/cart"
            className="flex items-center gap-1 text-[#424843] transition-colors hover:text-[#1e3425]"
          >
            <span className="material-symbols-outlined text-[18px]">
              shopping_cart
            </span>
            <span>Cart</span>
          </Link>

          <span className="text-[#c3c8c1]">/</span>

          <span className="font-semibold text-[#1e3425]">
            Information &amp; Delivery
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1200px] px-6 py-6">

        {/* Page Heading */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1b1c19] sm:text-3xl">
            Checkout &amp; Delivery
          </h1>

          <p className="mt-1 text-sm text-[#424843]">
            Please provide your details below for plastic-free
            carbon-neutral dispatch.
          </p>
        </header>

        {/* Checkout Columns */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

          {/* Left Column: Checkout Form */}
          <div className="flex flex-col gap-6 lg:col-span-7">

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >

              {/* Section 1: Contact Information */}
              <section className="rounded-lg bg-white p-6 shadow-sm">

                <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#1e3425]">
                    badge
                  </span>

                  <h2 className="text-lg font-semibold text-[#1e3425]">
                    1. Contact Information
                  </h2>
                </div>

                <div className="space-y-4">

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="full-name"
                      className="mb-1 block text-sm font-medium text-[#1b1c19]"
                    >
                      Full Name
                    </label>

                    <input
                      id="full-name"
                      name="fullName"
                      type="text"
                      placeholder="Maria Santos"
                      required
                      className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base text-[#1b1c19] outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                    />
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-[#1b1c19]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="maria.santos@gmail.com"
                        required
                        className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base text-[#1b1c19] outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                      />

                      <span className="mt-1 block text-xs text-[#737972]">
                        For order confirmation &amp; tracking receipt.
                      </span>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-[#1b1c19]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="0917 555 1234"
                        required
                        className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base text-[#1b1c19] outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                      />

                      <span className="mt-1 block text-xs text-[#737972]">
                        For courier delivery notifications only.
                      </span>
                    </div>

                  </div>
                </div>
              </section>

              {/* Section 2: Delivery Address */}
              <section className="rounded-lg bg-white p-6 shadow-sm">

                <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#1e3425]">
                    local_shipping
                  </span>

                  <h2 className="text-lg font-semibold text-[#1e3425]">
                    2. Delivery Address
                  </h2>
                </div>

                <div className="space-y-4">

                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor="street-address"
                      className="mb-1 block text-sm font-medium text-[#1b1c19]"
                    >
                      Street Address
                    </label>

                    <input
                      id="street-address"
                      name="streetAddress"
                      type="text"
                      placeholder="Unit 12B Tower 2, San Lorenzo Place, EDSA cor. Chino Roces Ave."
                      required
                      className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base text-[#1b1c19] outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                    />
                  </div>

                  {/* Apartment / Unit */}
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label
                        htmlFor="apt-suite"
                        className="text-sm font-medium text-[#1b1c19]"
                      >
                        Apartment, Suite, Unit
                      </label>

                      <span className="text-xs text-[#737972]">
                        Optional
                      </span>
                    </div>

                    <input
                      id="apt-suite"
                      name="apartment"
                      type="text"
                      placeholder="Barangay San Lorenzo"
                      className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base text-[#1b1c19] outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                    />
                  </div>

                  {/* City, State, Postal Code */}
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1 block text-sm font-medium text-[#1b1c19]"
                      >
                        City
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Makati City"
                        required
                        className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-1 block text-sm font-medium text-[#1b1c19]"
                      >
                        State
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="Metro Manila"
                        required
                        className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="mb-1 block text-sm font-medium text-[#1b1c19]"
                      >
                        Postal Code
                      </label>

                      <input
                        id="postal-code"
                        name="postalCode"
                        type="text"
                        placeholder="1223"
                        required
                        className="w-full rounded border border-[#c3c8c1] bg-white px-3.5 py-2.5 text-base outline-none transition-colors focus:bg-[#f5f4ee] focus:ring-2 focus:ring-[#1e3425]"
                      />
                    </div>

                  </div>
                </div>
              </section>

              {/* Section 3: Delivery Method */}
              <section className="rounded-lg bg-white p-6 shadow-sm">

                <div className="mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#1e3425]">
                    nest_eco_leaf
                  </span>

                  <h2 className="text-lg font-semibold text-[#1e3425]">
                    3. Delivery Method
                  </h2>
                </div>

                <fieldset className="space-y-2">
                  <legend className="sr-only">
                    Choose a delivery option
                  </legend>

                  {/* Standard Delivery */}
                  <label
                    className={`flex cursor-pointer items-start justify-between gap-3 rounded-lg p-4 transition-colors ${
                      deliveryMethod === 'standard'
                        ? 'bg-[#d5e4cb]/25'
                        : 'bg-[#f5f4ee] hover:bg-[#efeee9]'
                    }`}
                    style={{
                      boxShadow:
                        deliveryMethod === 'standard'
                          ? 'inset 0 0 0 1.5px #1e3425'
                          : 'inset 0 0 0 1px #c3c8c1',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                        className="mt-1 h-4 w-4 accent-[#1e3425]"
                      />

                      <div>
                        <span className="block text-sm font-semibold text-[#1e3425]">
                          Standard Carbon-Neutral Delivery
                        </span>

                        <span className="mt-0.5 block text-sm text-[#424843]">
                          3-5 business days via regional zero-emission fleet
                        </span>
                      </div>
                    </div>

                    <span className="whitespace-nowrap text-sm font-semibold text-[#1e3425]">
                      Free
                    </span>
                  </label>

                  {/* Express Delivery */}
                  <label
                    className={`flex cursor-pointer items-start justify-between gap-3 rounded-lg p-4 transition-colors ${
                      deliveryMethod === 'express'
                        ? 'bg-[#d5e4cb]/25'
                        : 'bg-[#f5f4ee] hover:bg-[#efeee9]'
                    }`}
                    style={{
                      boxShadow:
                        deliveryMethod === 'express'
                          ? 'inset 0 0 0 1.5px #1e3425'
                          : 'inset 0 0 0 1px #c3c8c1',
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                        className="mt-1 h-4 w-4 accent-[#1e3425]"
                      />

                      <div>
                        <span className="block text-sm font-semibold text-[#1b1c19]">
                          Express Eco Courier
                        </span>

                        <span className="mt-0.5 block text-sm text-[#424843]">
                          1-2 business days with 100% verified offsets
                        </span>
                      </div>
                    </div>

                    <span className="whitespace-nowrap text-sm font-semibold text-[#1b1c19]">
                      ₱250.00
                    </span>
                  </label>
                </fieldset>
              </section>

              {/* Place Order Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={cartItems.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#344b3a] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1e3425] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>

                  <span>
                    Place Order ({formatPeso(totalAmount)})
                  </span>
                </button>
              </div>

            </form>

            {/* Simulated Order Confirmation */}
            {orderPlaced && (
              <section className="rounded-lg bg-[#d5e4cb] p-6 shadow-sm">
                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1e3425] text-white">
                    <span className="material-symbols-outlined text-[24px]">
                      done_all
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#121f0f]">
                      Order Placed Successfully!
                    </h3>

                    <p className="mt-1 text-base text-[#586753]">
                      Thank you, {customerName}. Your order #TW-80412
                      has been received and is currently being assembled
                      with plastic-free materials.
                    </p>

                    <div className="mt-4 flex gap-2">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1e3425]">
                        <span className="material-symbols-outlined text-[18px]">
                          receipt_long
                        </span>
                        View Packing Receipt
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:sticky lg:top-20 lg:col-span-5">
            <div className="rounded-lg bg-white p-6 shadow-sm">

              {/* Summary Heading */}
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-lg font-semibold text-[#1e3425]">
                  Order Summary
                </h2>

                <span className="rounded-full bg-[#d5e4cb] px-2.5 py-0.5 text-xs font-medium text-[#586753]">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Product Previews */}
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-[#efeee9]">
                      <img
                        src={item.image}
                        alt={item.alt || item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-[#1b1c19]">
                        {item.name}
                      </h3>

                      <p className="text-sm text-[#424843]">
                        Qty: {item.quantity}
                        {item.variantDescription
                          ? ` • ${item.variantDescription}`
                          : ''}
                      </p>

                      <p className="text-xs text-[#737972]">
                        {item.material}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="whitespace-nowrap text-sm font-semibold text-[#1b1c19]">
                        {formatPeso(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}

                {cartItems.length === 0 && (
                  <p className="py-4 text-sm text-[#737972]">
                    Your cart is empty.
                  </p>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 border-t border-[#e4e2dd] pt-4">

                <div className="flex items-center justify-between text-sm text-[#424843]">
                  <span>Subtotal</span>

                  <span className="font-medium text-[#1b1c19]">
                    {formatPeso(cartSubtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#424843]">
                  <span className="flex items-center gap-1">
                    Shipping

                    <span className="material-symbols-outlined text-[16px] text-[#54624f]">
                      info
                    </span>
                  </span>

                  <span className="font-medium text-[#1e3425]">
                    {shippingCost === 0
                      ? 'Free'
                      : formatPeso(shippingCost)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#424843]">
                  <span>Estimated Carbon Offsets</span>

                  <span className="font-medium text-[#1b1c19]">
                    ₱0.00 (Included)
                  </span>
                </div>

                <div className="my-2 h-px bg-[#e4e2dd]" />

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-lg font-bold text-[#1b1c19]">
                      Total Amount
                    </span>

                    <span className="block text-xs text-[#737972]">
                      Taxes included
                    </span>
                  </div>

                  <span className="text-lg font-bold text-[#1b1c19]">
                    {formatPeso(totalAmount)}
                  </span>
                </div>

              </div>

              {/* Packaging Guarantee */}
              <div className="mt-6 flex items-center gap-2 rounded-lg bg-[#efeee9] p-4">
                <span className="select-none text-xl">🌿</span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1e3425]">
                    100% Plastic-Free Packaging Guarantee
                  </p>

                  <p className="mt-0.5 text-xs leading-tight text-[#424843]">
                    Enclosed in plant-based compostable film and
                    unbleached FSC-certified kraft paper tape.
                  </p>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}

export default Checkout
