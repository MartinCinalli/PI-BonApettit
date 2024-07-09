import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faDrumstickBite, faBreadSlice, faTint } from '@fortawesome/free-solid-svg-icons';
import { fetchCaracteristicas } from '../../api/api';

const NutritionalDetails = ({ caracteristicas }) => {

  return (
    <div className='nutritional-details'>
      <h3>Detalles Nutricionales</h3>
      <br />
      <h4>Características</h4>
        <ul>
          {
            caracteristicas?.map( caracteristica => 
              <li key={caracteristica.id}>
                <img src={caracteristica.urlImg} alt={caracteristica.nombre} className="detail-icon"/>
                <p>{caracteristica.nombre}</p>
              </li>
            )
          }
        </ul>
      <br />
      <h4>Macro nutrientes</h4>
      <ul>
        <li>
          <FontAwesomeIcon icon={faFire}  />
          <p>100 Kcal</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faDrumstickBite}  />
          <p>80% proteínas</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faBreadSlice}  />
          <p>25% carbohidratos</p>
        </li>
        <li>
          <FontAwesomeIcon icon={faTint}  />
          <p>12% grasas</p>
        </li>
      </ul>
    </div>
  );
}

export default NutritionalDetails;
