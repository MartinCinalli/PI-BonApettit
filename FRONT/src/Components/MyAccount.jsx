import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/config';
import axios from 'axios';
import { bonappetitApi } from '../api/axiosConfig';

const MyAccount = () => {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    correo: JSON.parse(localStorage.getItem('email'))
  });

  const {nombre, apellido, correo} = user;
  const url = `${BASE_URL}/usuarios/buscar/${correo}`;

  useEffect(() => {
    fetchData();
  }, [url, user]);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await bonappetitApi.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUser({
        ...user,
        nombre: response.data.nombre,
        apellido: response.data.apellido
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className='root-myAccount'>
        <h2>Mis datos</h2>
        <div>
            <h3>Nombre:</h3>
            <p>{`${nombre}`}</p>
            <h3>Apellido:</h3>
            <p>{`${apellido}`}</p>
            <h3>Correo:</h3>
            <p>{`${correo}`}</p>
        </div>
      </div>
    </>
  )
}

export default MyAccount