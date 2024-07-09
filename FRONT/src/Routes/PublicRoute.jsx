import { useContext } from 'react'
import { AuthContext } from '../Context/Auth/AuthContext'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children }) => {
  const { authState: { logged } } = useContext( AuthContext )

  return !logged ? children : <Navigate to='/'/> 
}