
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { CartProvider } from './context/CartContext'

import StoreLayout from './layouts/StoreLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

// Temporary placeholder for pages we haven't built yet
function PagePlaceholder({ title }) {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-10">
      <h1 className="text-2xl font-semibold text-[#1e3425]">
        {title}
      </h1>

      <p className="mt-2 text-[#424843]">
        This page will be implemented using the original TerraWear Stitch design.
      </p>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* Store pages share the same header */}
          <Route element={<StoreLayout />}>

            <Route
              path="/"
              element={<Navigate to="/shop" replace />}
            />

            <Route
              path="/shop"
              element={<Shop />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Route>

          {/* Login uses a separate layout */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
