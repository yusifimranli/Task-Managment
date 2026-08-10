import { Routes, Route } from 'react-router'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import Dashboard from '../features/tasks/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default Router