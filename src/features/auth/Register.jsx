import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [confirmPassword,setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)

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
    if (password.length < 8) {
      alert("Password ən azı 8 simvol olmalıdır")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwordlar eyni deyil")
      return
    }
    if (terms) {
      alert("Terms and Conditions qəbul etməlisən")
      return
    }

    console.log(email);
    console.log(password);

  const user = {
    email,
    password
  }

  const users = JSON.parse(localStorage.getItem("users")) || []

  const existingUser = users.find(
    (user) => user.email === email
  )

  if (existingUser) {
    alert("Bu email artıq qeydiyyatdan keçib")
    return
  }

  users.push({
    email,
    password
  })

  localStorage.setItem("users", JSON.stringify(users))

  alert("Qeydiyyat uğurla tamamlandı ✅")

  navigate("/")
    
    
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
          {/* Confirm Password */} 
          <div>
             <label htmlFor="confirm-password" className="block mb-1.5 text-sm font-semibold text-slate-700" >
               Confirm Password </label>
              <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="confirm-password" name="confirm-password" placeholder="••••••••" required
               className="w-full px-3.5 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
            </div>
             {/* Terms */} 
             <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 accent-indigo-600" />
                <span> I accept the{" "} <a href="#"
                  className="text-indigo-600 font-medium hover:text-purple-600 transition" >
                  Terms and Conditions </a>
                </span> 
              </label>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5 transition-all">
            Sign up →
          </button>
          

          <p className="text-center text-sm text-slate-500 pt-2">
            Already have an account?
            <a href="/" className="ml-1 text-indigo-600 font-semibold hover:text-purple-600 transition">
              Login
            </a>
          </p>

        </form>

      </div>
    </div>
  )
}

export default Register
