import React, { useEffect } from 'react'
import { Navigate, redirect } from 'react-router-dom'

function ProtectedRoute({children}) {
  function isAuthenticated() {
    const auth_token = localStorage.getItem("auth_token")
    return auth_token
  }

  return (
    <>
      {isAuthenticated() ? children : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedRoute
