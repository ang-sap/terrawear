
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/terrawear-logo.svg'

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email')
    const password = formData.get('password')
    const rememberMe = formData.get('remember-me') === 'on'

    try {
      setLoading(true)

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Invalid email or password.')
      }

      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem('token', data.token)
      storage.setItem('user', JSON.stringify(data.data))

      navigate('/shop')
    } catch (err) {
      setError(err.message || 'Unable to connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f4ee] px-4 py-6 font-['Inter'] text-[#1b1c19]">
      <main className="w-full max-w-md">
        <div className="rounded-xl border border-[#c3c8c1]/60 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 text-center">
            <img
              src={logo}
              alt="TerraWear"
              className="mx-auto mb-6 h-12 w-auto object-contain"
            />

            <h1 className="text-2xl font-semibold tracking-tight text-[#1e3425]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#424843]">
              Sign in to your sustainable wardrobe account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#1b1c19]"
              >
                Email address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-[#c3c8c1] bg-[#fbf9f4] px-4 py-2.5 text-base transition-colors placeholder:text-[#424843]/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e3425]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#1b1c19]"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-[#c3c8c1] bg-[#fbf9f4] px-4 py-2.5 text-base transition-colors placeholder:text-[#424843]/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e3425]"
              />

              <div className="mt-2 flex justify-end">
                <a
                  href="#"
                  className="text-xs font-medium text-[#1e3425] hover:text-[#344b3a] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-[#c3c8c1] accent-[#1e3425] focus:ring-2 focus:ring-[#1e3425]"
              />

              <label
                htmlFor="remember-me"
                className="ml-2 cursor-pointer select-none text-sm text-[#424843]"
              >
                Remember me
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#344b3a] px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-[#1e3425] disabled:opacity-60"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>

              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-8 border-t border-[#c3c8c1]/40 pt-6 text-center text-sm text-[#424843]">
            <span>Don't have an account?</span>

            <Link
              to="/register"
              className="ml-1 font-medium text-[#1e3425] hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[#424843]/70">
          <span className="material-symbols-outlined text-[16px] text-[#54624f]">
            eco
          </span>

          <span>
            100% paperless receipts &amp; encrypted customer data
          </span>
        </div>
      </main>
    </div>
  )
}

export default Login
