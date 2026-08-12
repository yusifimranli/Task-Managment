import { Routes, Route } from 'react-router'
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'
import Dashboard from '../features/tasks/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import PublicRoute from '../components/PublicRoute'
import NotFound from '../features/NotFound'


function Router() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router