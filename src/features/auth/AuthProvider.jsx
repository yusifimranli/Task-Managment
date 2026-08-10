import React, { createContext,useReducer } from 'react'

export const AuthContext = createContext([])
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload
      }

    case 'LOGOUT':
      return {
        ...state,
        token: null
      }

    default:
      return state
  }
}

function AuthProvider({children}) {
  const initialState = {
    token: localStorage.getItem('token') || null
  }
  const [state, dispatch] = useReducer(authReducer, initialState)
  return (
  <AuthContext.Provider value={{ state, dispatch }}>
    {children}
  </AuthContext.Provider>
)
}

export default AuthProvider
