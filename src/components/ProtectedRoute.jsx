import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '../features/auth/AuthProvider'

function ProtectedRoute({ children }) {
  const { state } = useContext(AuthContext)

  return state.token
    ? children
    : <Navigate to="/" replace />
}

export default ProtectedRoute