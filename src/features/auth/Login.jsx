import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';



function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Email və password daxil et")
      return
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailCheck.test(email)) {
      alert("Düzgün email daxil et")
      return
    }

    if (password.length < 6) {
      alert("Password ən azı 6 simvol olmalıdır")
      return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    )

    if (!user) {
      alert("Email və ya password yanlışdır")
      return
    }

    const token = "fake-token-123"

    localStorage.setItem("token", token)

    dispatch({
      type: 'LOGIN',
      payload: token
    })

    navigate("/dashboard")

    
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-white to-purple-100">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-white">

        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl shadow-lg">
            🔐
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-slate-700">
              Email
            </label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" type="email" placeholder="yusif@gmail.com" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-slate-700">
              Password
            </label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  id="password" type="password" placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-indigo-600"/>
              Remember me
            </label>
            <a href="#" className="text-indigo-600 font-medium hover:text-purple-600 transition">Forgot password?</a>
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 transition-all">
            Sign in →
          </button>
          

          <p className="text-center text-sm text-slate-500 pt-2">
            Don't have an account?
            <a href="/register" className="ml-1 text-indigo-600 font-semibold hover:text-purple-600 transition">
              Sign up
            </a>
          </p>

        </form>

      </div>
    </div>
  )
}

export default Login

