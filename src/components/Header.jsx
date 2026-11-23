
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logo from '../assets/terrawear-logo.svg'

function Header() {
  const { cartCount } = useCart()

  const navigationLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Cart', path: '/cart' },
  ]

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#c3c8c1] bg-[#f5f4ee]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">

        {/* TerraWear Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="TerraWear"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 py-1 transition-colors ${
                  isActive
                    ? 'border-b-2 border-[#1e3425] font-semibold text-[#1e3425]'
                    : 'text-[#424843] hover:text-[#1b1c19]'
                }`
              }
            >
              {link.name}

              {link.name === 'Cart' && cartCount > 0 && (
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#344b3a] text-[10px] leading-none text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}

          {/* User Profile */}
          <NavLink
            to="/login"
            aria-label="User Profile"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c3c8c1] text-[#424843] transition-colors hover:border-[#1e3425] hover:text-[#1e3425]"
          >
            <span className="material-symbols-outlined text-[18px]">
              person
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
