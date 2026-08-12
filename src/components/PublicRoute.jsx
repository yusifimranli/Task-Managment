import { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '../features/auth/AuthProvider'

function PublicRoute({ children }) {
  const { state } = useContext(AuthContext)

  return state.token
    ? <Navigate to="/dashboard" />
    : children
}

export default PublicRoute