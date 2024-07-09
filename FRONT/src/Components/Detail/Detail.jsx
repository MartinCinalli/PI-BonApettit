import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import NutritionalDetails from "./NutritionalDetails";
import RecipeCalendar from "./RecipeCalendar";
import { ContextGlobal } from "../../Context";
import { ImagesContainer } from "./ImagesContainer";
import { SearchBar } from "../SearchBar";
import { AuthContext } from '../../Context';
import RecipeRatingDetails from "./RecipeRatingDetails";
import { bonappetitApi } from "../../api/axiosConfig";

export const Detail = () => {
  const { authState: { logged } } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();
  const { dispatch, state } = useContext(ContextGlobal);
  const { favs, recipeSelected, data } = state;
  const { nombre, imagenes, categorias, caracteristicas, descripcion, ingredientes, instrucciones, id } = recipeSelected;
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    bonappetitApi.get(`/recetas/${params.id}`)
      .then((response) => {
        dispatch({ type: 'GET_SELECTED', payload: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Please check your token.");
        } else {
          console.error("Error fetching recipe details:", error);
        }
      });
  }, [params.id, token]);

  const addFav = () => {
    dispatch({ type: 'ADD_FAV', payload: state.recipeSelected });
    alert(`Se agregó la receta ${nombre} a favoritos`);
  }
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs));
  }, [state.favs])
  const removeFav = () => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
    alert(`Se eliminó la receta ${nombre} de favoritos`);
  };

  const includesArray = favs.map(item => item.id).includes(recipeSelected.id);

  const handleShare = () => {
    const shareData = {
      title: nombre,
      text: 'Mira esta receta increíble que encontré!',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => {})
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('La funcionalidad de compartir no es soportada por tu navegador.');
    }
  };
  
  const handlePrevious = () => {
    const recipeDataIndex = data.findIndex(recipe => recipe.id === id)
    const previousRecipe = data.at(recipeDataIndex - 1).id
    navigate(`/recipe/${previousRecipe}`)
  }

  const handleNext = () => {
    const recipeDataIndex = data.findIndex(recipe => recipe.id === id)
    const nextRecipe = data.at(recipeDataIndex + 1).id
    navigate(`/recipe/${nextRecipe}`)
  }

  return (
    <>
      <div className="detail">
        <SearchBar />
        <div className="name-container">
          <h1>{nombre}</h1>
          <button className="button-back" onClick={() => navigate(-1)}>
              <i className="fas fa-reply"></i>
              <span>VOLVER A LA CARTA</span>
          </button>
        </div>
        
        <ImagesContainer imagenes={imagenes} />

        <div className="details-container">
          <div className="main-details">
            <div className="fav-rating-share-container">
              <RecipeRatingDetails recipe={recipeSelected}/>
              <div className="vertical-line"></div>
              <div className="fav-container">
                {logged && (
                  <>
                    {
                      includesArray ?
                        <button className="fav-button" onClick={removeFav}>
                          <i className="fa-solid fa-heart"></i>
                        </button>
                        :
                        <button className="fav-button" onClick={addFav}>
                          <i className="fa-regular fa-heart"></i>
                        </button>
                    }
                    <div className="vertical-line middle"></div>
                    <button className="button-share" onClick={handleShare}>
                      <i className="fas fa-share-nodes"></i> 
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="ingredientes">
              <h1>Ingredientes:</h1>
              <RecipeDetails
                categorias={categorias}
                descripcion={null}
                ingredientes={ingredientes}
                instrucciones={null}
              />
            </div>
          </div>
          <div className="side-details-container">
            <NutritionalDetails caracteristicas={caracteristicas}/>
            {
              logged && 
                <>
                  <div className="separator"></div>
                  <RecipeCalendar recipeId={state.recipeSelected} />
                </>
            }
          </div>
        </div>

        <div className="instructions-container">
          <h1>Modo de preparación:</h1>
          <RecipeDetails
            categorias={categorias}
            descripcion={null}
            ingredientes={null}
            instrucciones={instrucciones}
          />
        </div>

        <div className="navigation-buttons">
          {
            id > data.at(0).id &&
            <button className="nav-button" onClick={handlePrevious} >
              <i className="fas fa-chevron-left"></i>
            </button>
          }
          <button className="nav-button" onClick={() => navigate(`/${categorias[0].categorias}`)}>
            Volver al Menú Principal
          </button>
          {
            id < data.at(-1).id &&
            <button className="nav-button" onClick={handleNext} >
              <i className="fas fa-chevron-right"></i>
            </button>
          }
        </div>
      </div>
    </>
  );
};
