import { Link } from 'react-router'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-slate-500">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound