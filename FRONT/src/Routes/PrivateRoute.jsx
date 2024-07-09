import { useContext } from 'react'
import { AuthContext } from '../Context/Auth/AuthContext'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {
  const { authState: { logged, user }, authState } = useContext( AuthContext )

  return logged && user.role === 'ADMIN' ? children : <Navigate to='/'/> 
}
