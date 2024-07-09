import { createContext, useReducer, useContext } from 'react';
import { authReducer } from './authReducer';
import { types } from './types/types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';

export const AuthContext = createContext();

const init = () => { 
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!token,
    token: token,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = ({ token, nombre, rol, correo }) => {
    const user = { id: 'abc', name: nombre, role: rol, email: correo };
    const action = {
      type: types.login,
      payload: user
    };
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(action);
  };

  const logout = () => { 
    const action = { type: types.logout };
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    dispatch(action);
    navigate(`${routes.home}`);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
