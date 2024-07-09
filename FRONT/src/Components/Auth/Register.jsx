import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context';
import { ToastContainer, toast } from 'react-toastify';
import { bonappetitApi } from '../../api/axiosConfig';

export const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
  });
  const [hideButtons, setHideButtons] = useState(false);
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errors = {};

    if (formData.nombre.length < 4) {
      errors.nombre = 'El nombre debe tener al menos 4 caracteres';
    }

    if (formData.apellido.length < 2) {
      errors.apellido = 'El apellido debe tener al menos 2 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      errors.correo = 'El formato del email es inválido';
    }

    if (!/[A-Z]/.test(formData.contraseña)) {
      errors.contraseña = 'La contraseña debe tener al menos una letra mayúscula';
    }
    if (formData.contraseña.length < 6) {
      errors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(errors);
    disabledButtons();
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const disabledButtons = () => {
    setHideButtons(!hideButtons);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await bonappetitApi.post('/auth/registro', formData);

        toast.success('Registro Exitoso, BON APPETIT', {
          icon: '✔️',
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Intentar iniciar sesión después del registro
        try {
          const loginResponse = await bonappetitApi.post('/auth/login', {
            correo: formData.correo,
            contraseña: formData.contraseña,
          });
          // console.log('Inicio de sesión exitoso', loginResponse.data);

          // Guardar token en localStorage
          localStorage.setItem('token', loginResponse.data.token);

          // Loguear al usuario
          login(loginResponse.data);


          // Navegar al home después de un tiempo
          setTimeout(() => {
            // console.log('Redirigiendo al home...');
            navigate('/');
          }, 25000); // Ajusta el tiempo según sea necesario (5000ms = 5 segundos)
        } catch (loginError) {
          console.error('Error en el inicio de sesión:', loginError);
        }
      } catch (error) {
        if (error.response) {
          // La solicitud se realizó y el servidor respondió con un código de estado
          // que cae fuera del rango de 2xx
          if (error.response.status === 409) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              correo: 'El correo ya está en uso',
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: 'Ocurrió un error inesperado',
            }));
          }
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió respuesta
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: 'No se recibió respuesta del servidor',
          }));
        } else {
          // Algo sucedió al configurar la solicitud que provocó un error
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: 'Error al configurar la solicitud',
          }));
        }
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Cambia la ruta según sea necesario
  };



  return (
    <div>
      <ToastContainer
        position="right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className='register-container'>
        <div className="register-image-container">
          <img src="/Images/logo-plato.png" alt="Registration Image" className="register-image" />
        </div>
        <div className="register">
          <h2>Registrarse</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese su nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'input-error' : ''}
              />
              {errors.nombre && <p className="error-message">{errors.nombre}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Ingrese su apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={errors.apellido ? 'input-error' : ''}
              />
              {errors.apellido && <p className="error-message">{errors.apellido}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="correo">Email</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingrese su correo electrónico"
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
                placeholder="Ingrese su contraseña (debe contener al menos una mayúscula)"
                value={formData.contraseña}
                onChange={handleChange}
                className={errors.contraseña ? 'input-error' : ''}
              />
              {errors.contraseña && <p className="error-message">{errors.contraseña}</p>}
            </div>
            <div className="form-buttons">
              {!hideButtons ?
                <>
                  <button type="submit" className="register-button">Registrarse</button>
                  <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
                </> 
                :
                  <button type="submit" className="register-button" disabled>Registrando...</button>
              }
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};
