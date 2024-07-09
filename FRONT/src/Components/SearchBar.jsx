import React, { useState, useContext, useEffect, useRef } from 'react';
import { SearchContext } from '../Context/SearchContext';
import { ContextGlobal } from '../Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SearchBar = ({recipeId}) => {
  const { state } = useContext(ContextGlobal);
  const { searchTerm, setSearchTerm, setFilteredRecipes } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const suggestionsRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("State data:", state.data); // Para verificar la estructura de los datos
  }, [state.data]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      handleSearch(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (term) => {
    const results = state.data.filter(recipe =>
      recipe.nombre.toLowerCase().includes(term.toLowerCase()) ||
      recipe.descripcion.toLowerCase().includes(term.toLowerCase()) ||
      recipe.ingredientes.toLowerCase().includes(term.toLowerCase())
    );

    const recipesWithRatings = await Promise.all(results.slice(0, 5).map(async (recipe) => {
      try {
        const ratingResponse = await axios.get(`/recetas/${recipe.id}/puntaje`);
        return {
          ...recipe,
          averageRating: parseFloat(ratingResponse.data),
          
        };
      } catch (error) {
        console.error('Error fetching rating:', error);
        return {
          ...recipe,
          averageRating: null,
        };
      }
    }));
    
    setSuggestions(recipesWithRatings);
    
  };
  
  const handleSuggestionClick = (recipe) => {
    setSearchTerm(recipe.nombre);
    setSelectedSuggestion(recipe.id);
    setSuggestions([]);
  };

  const handleSearchButtonClick = () => {
    if (selectedSuggestion !== null) {
      navigate(`/recipe/${selectedSuggestion}`);
    }
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="¿QUÉ MENÚ TIENES EN MENTE?"
        />
        {suggestions.length > 0 && (
          <div className="suggestions" ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => {
              const imageUrl = suggestion.imagenes?.length > 0 ? suggestion.imagenes[0].urlImg : '';
              return (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <img 
                    src={imageUrl} 
                    alt={suggestion.nombre} 
                    className="suggestion-image" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} // Reemplaza 'fallback-image-url' con una URL de imagen alternativa si la imagen no se carga
                  />
                  <div className="suggestion-info">
                    <span>{suggestion.nombre}</span>
                    <div className="suggestion-rating">
                      <i className="fas fa-star "></i>
                      <span>{suggestion.puntajePromedio !== null ? suggestion.puntajePromedio.toFixed(1) : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button onClick={handleSearchButtonClick} className="search-button">
          <img src="/Images/Lupa.png" alt="Buscar" className="search-icon" />
        </button>
      </div>
    </div>
  );
};
