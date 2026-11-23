
import logo from '../assets/terrawear-logo.svg'

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f4ee] px-4 py-6 font-['Inter'] text-[#1b1c19]">
      <main className="w-full max-w-md">
        <div className="rounded-xl border border-[#c3c8c1]/60 bg-white p-8 shadow-sm sm:p-10">

          {/* Logo and Heading */}
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

          {/* Login Form */}
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
                placeholder="maria.santos@gmail.com"
                required
                className="w-full rounded-lg border border-[#c3c8c1] bg-[#fbf9f4] px-4 py-2.5 text-base transition-colors placeholder:text-[#424843]/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e3425]"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#1b1c19]"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs font-medium text-[#1e3425] hover:text-[#344b3a] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-[#c3c8c1] bg-[#fbf9f4] px-4 py-2.5 text-base transition-colors placeholder:text-[#424843]/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1e3425]"
              />
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

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#344b3a] px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-[#1e3425]"
            >
              <span>Sign In</span>

              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-8 border-t border-[#c3c8c1]/40 pt-6 text-center text-sm text-[#424843]">
            <span>Don't have an account?</span>

            <a
              href="#"
              className="ml-1 font-medium text-[#1e3425] hover:underline"
            >
              Create account
            </a>
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
