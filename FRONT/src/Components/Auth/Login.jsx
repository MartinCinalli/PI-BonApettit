import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Context';
import { routes } from '../../utils/routes'
import { bonappetitApi } from '../../api/axiosConfig';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      errors.correo = 'El formato del email es inválido';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await bonappetitApi.post('/auth/login', formData);
        localStorage.setItem('email', JSON.stringify(formData.correo));
        login(response.data); 
      } catch (error) {
        const apiErrors = {};
        if (error.response) {
          if (error.response.status === 401) {
            apiErrors.contraseña = 'Contraseña incorrecta';
          } else if (error.response.status === 404) {
            apiErrors.correo = 'Correo no encontrado';
          } else {
            apiErrors.general = 'Ocurrió un error inesperado';
          }
        }
        setErrors(apiErrors);
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Cambia la ruta según sea necesario
  };

  return (
    <div className="login">
      <div className="login-columns">
        {/* Columna de Bienvenida y Enlaces */}
        <div className="login-column">
          <h1>Bienvenido/a</h1>
          <hr className='login-horizontal-line' />
          <p><a href="#">¡Olvidaste tu contraseña?</a></p>
          <hr className='login-horizontal-line' />
          <p>¿No tienes cuenta? <Link to={routes.register}>Registrarse</Link></p>
        </div>
        
        {/* Columna del Formulario de Login */}
        <div className="login-column">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="correo">Email</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errors.correo ? 'input-error' : ''}
              />
              {errors.correo && <p className="error-message">{errors.correo}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className={errors.contraseña ? 'input-error' : ''}
              />
              {errors.contraseña && <p className="error-message">{errors.contraseña}</p>}
            </div>
            <div className="form-buttons">
              <button type="submit" className="login-button">Iniciar sesión</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
            </div>
            {errors.general && <p className="error-message">{errors.general}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
