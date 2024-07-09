import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { bonappetitApi } from '../../api/axiosConfig';

const RatingModal = ({ recipeId, recipeName, onClose, setCheckClicked }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(0); // Reset rating when the modal opens
  }, [recipeId]);

  const handleRating = (index) => {
    setRating(index);
  };

  const submitRating = () => {
    bonappetitApi.post(`/recetas/${recipeId}/calificar`, null, {
      params: { puntaje: rating }
    })
    .then(() => {
      setCheckClicked(true)
      onClose(); // Close the modal after submitting the rating
    })
    .catch(error => {
      console.error('Error submitting rating:', error);
    });
  };

  return (
    <div className="modal-rait">
      <div className="modal-content-rait">
        <h2>Calificar: {recipeName}</h2>
        <div className="rating-container-modal">
          {[1, 2, 3, 4, 5].map((index) => (
            <i
              key={index}
              className={`fa-star ${index <= rating ? 'fas' : 'far'}`}
              onClick={() => handleRating(index)}
            ></i>
          ))}
        </div>
          <div className='buttons-modal-rait'>
            <button className='btn-modal-rait' onClick={submitRating}>Aceptar</button>
          </div>
      </div>
    </div>
  );
};

export default RatingModal;
