import { useContext } from 'react'
import { AuthContext } from '../Context'
import { Navigate } from 'react-router-dom'

export const UserRoute = ({ children }) => {
  const { authState: { logged } } = useContext( AuthContext )
  
  return logged ? children : <Navigate to='/'/> 
}
