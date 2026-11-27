
import { useState } from 'react'
import {
    User,
    Mail,
    Lock,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
    ChevronRight,
    Leaf,
} from 'lucide-react'

import logo from '../assets/terrawear-logo.svg'

function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setMessage('')
        setError('')

        const form = new FormData(e.currentTarget)

        const fullName = form.get('fullName')
        const email = form.get('email')
        const password = form.get('password')
        const confirmPassword = form.get('confirmPassword')
        const terms = form.get('terms') === 'on'

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        if (!terms) {
            setError('Please accept the Terms of Service and Privacy Policy.')
            return
        }

        try {
            setLoading(true)

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    confirmPassword,
                    terms,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Registration failed.')
            }

            setMessage('Your account has been created successfully!')
            e.target.reset()
        } catch (err) {
            setError(err.message || 'Unable to connect to the server.')
        } finally {
            setLoading(false)
        }
    }

    const inputClass =
        'w-full bg-[#f5f4ee] text-[#1b1c19] text-sm pl-10 pr-4 py-3 rounded-lg border border-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1e3425] transition-colors placeholder:text-[#737972]/60'

    return (
        <main className="min-h-screen bg-[#f5f4ee] flex items-center justify-center px-4 py-8 font-sans text-[#1b1c19]">
            <div className="w-full max-w-md">
                <div className="w-full bg-white rounded-xl shadow-sm p-6 sm:p-8 flex flex-col items-center">

                    <div className="mb-5 flex items-center justify-center">
                        <img
                            src={logo}
                            alt="TerraWear"
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-xl font-semibold tracking-tight mb-1.5">
                            Create your account
                        </h1>
                        <p className="text-sm text-[#54624f]">
                            Join TerraWear for sustainable wardrobe essentials & rewards
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="fullName" className="text-sm font-medium">
                                Full Name
                            </label>
                            <div className="relative flex items-center">
                                <User className="absolute left-3 text-[#54624f]" size={19} />
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Maria Santos"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email address
                            </label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-3 text-[#54624f]" size={19} />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="maria.santos@gmail.com"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <Lock className="absolute left-3 text-[#54624f]" size={19} />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="At least 8 characters"
                                    minLength={8}
                                    required
                                    className={`${inputClass} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-[#54624f]"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <div className="relative flex items-center">
                                <LockKeyhole className="absolute left-3 text-[#54624f]" size={19} />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Re-enter your password"
                                    minLength={8}
                                    required
                                    className={`${inputClass} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-[#54624f]"
                                    aria-label="Toggle confirm password visibility"
                                >
                                    {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>

                        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                            <input
                                name="terms"
                                type="checkbox"
                                required
                                className="mt-0.5 h-4 w-4 accent-[#1e3425] cursor-pointer"
                            />
                            <span className="text-sm text-[#424843] leading-tight">
                                I agree to TerraWear's{' '}
                                <a href="#" className="text-[#1e3425] font-medium hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-[#1e3425] font-medium hover:underline">
                                    Privacy Policy
                                </a>
                            </span>
                        </label>

                        {error && (
                            <p className="text-sm text-red-600" role="alert">
                                {error}
                            </p>
                        )}

                        {message && (
                            <p className="text-sm text-green-700" role="status">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-[#344b3a] hover:bg-[#1e3425] disabled:opacity-60 text-white font-medium py-3 px-5 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
                        >
                            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="w-full flex items-center gap-3 my-6">
                        <div className="h-px bg-[#e4e2dd] flex-1" />
                        <span className="text-xs text-[#54624f] uppercase tracking-wider">
                            or
                        </span>
                        <div className="h-px bg-[#e4e2dd] flex-1" />
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-[#424843]">
                            Already have an account?
                            <a
                                href="/login"
                                className="text-[#1e3425] font-medium hover:underline ml-1 inline-flex items-center gap-0.5"
                            >
                                Sign in
                                <ChevronRight size={16} />
                            </a>
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[#54624f]">
                    <Leaf size={16} />
                    <span className="text-xs">
                        100% paperless receipts & encrypted customer data
                    </span>
                </div>
            </div>
        </main>
    )
}

export default Register
