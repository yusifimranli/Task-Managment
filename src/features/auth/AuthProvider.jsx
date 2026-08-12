import React, { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext([])

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt
      }

    case 'LOGOUT':
      return {
        ...state,
        token: null,
        expiresAt: null
      }

    default:
      return state
  }
}

function AuthProvider({ children }) {
  const savedToken = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null

  const initialState = {
    token: savedToken?.token || null,
    expiresAt: savedToken?.expiresAt || null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    if (!state.token || !state.expiresAt) return

    const remainingTime = state.expiresAt - Date.now()

    if (remainingTime <= 0) {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
      return
    }

    const timer = setTimeout(() => {
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
    }, remainingTime)

    return () => clearTimeout(timer)
  }, [state.token, state.expiresAt])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider