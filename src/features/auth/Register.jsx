import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [termsError, setTermsError] = useState('')
  const [registerError, setRegisterError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
    setTermsError('')
    setRegisterError('')

    let hasError = false

    if (!email) {
      setEmailError('Email daxil et')
      hasError = true
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email && !emailCheck.test(email)) {
      setEmailError('Düzgün email daxil et')
      hasError = true
    }

    if (!password) {
      setPasswordError('Password daxil et')
      hasError = true
    } else if (password.length < 8) {
      setPasswordError('Password ən azı 8 simvol olmalıdır')
      hasError = true
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Password-u təkrar daxil et')
      hasError = true
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwordlar eyni deyil')
      hasError = true
    }

    if (!terms) {
      setTermsError('Terms and Conditions qəbul etməlisən')
      hasError = true
    }

    if (hasError) return

    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find(
      (user) => user.email === email
    )

    if (existingUser) {
      setRegisterError('Bu email artıq qeydiyyatdan keçib')
      return
    }

    users.push({
      email,
      password
    })

    localStorage.setItem('users', JSON.stringify(users))

    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-white">

        <div className="text-center mb-8">

          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl shadow-lg">
            ✨
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account to get started
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-slate-700"
            >
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="yusif@gmail.com"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {emailError && (
              <p className="mt-1 text-sm text-red-500">
                {emailError}
              </p>
            )}
          </div>


          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {passwordError && (
              <p className="mt-1 text-sm text-red-500">
                {passwordError}
              </p>
            )}
          </div>


          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-semibold text-slate-700"
            >
              Confirm Password
            </label>

            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {confirmPasswordError && (
              <p className="mt-1 text-sm text-red-500">
                {confirmPasswordError}
              </p>
            )}
          </div>


          {/* Terms */}
          <div>

            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">

              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />

              <span>
                I accept the{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:text-purple-600 transition"
                >
                  Terms and Conditions
                </a>
              </span>

            </label>

            {termsError && (
              <p className="mt-1 text-sm text-red-500">
                {termsError}
              </p>
            )}

          </div>


          {/* Existing user error */}
          {registerError && (
            <p className="text-sm text-red-500">
              {registerError}
            </p>
          )}


          {/* Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 transition-all"
          >
            Sign up →
          </button>


          {/* Login */}
          <p className="text-center text-sm text-slate-500 pt-2">

            Already have an account?

            <a
              href="/"
              className="ml-1 text-indigo-600 font-semibold hover:text-purple-600 transition"
            >
              Login
            </a>

          </p>

        </form>

      </div>

    </div>
  )
}

export default Register