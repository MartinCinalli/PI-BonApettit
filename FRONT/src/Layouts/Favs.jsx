import { useContext } from "react";
import { ContextGlobal } from "../Context";
import { CardCategoria } from '../Components/CardCategoria';

const Favs = () => {
  const { state, dispatch } = useContext(ContextGlobal);
  const { favs } = state;

  const handleRemoveFav = (id) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
    alert('Receta eliminada de favoritos');
  };

  return (
    <>    
      <div className="favoritos-title">
        {favs.length === 0 ? 
          <h3>Tu colección de recetas favoritas está vacía por ahora. ¡Vamos a llenarla con algunas delicias!</h3>
          :
          <>
            <h3>Favoritos</h3>
            <div className="category-recipes">
              {favs.map(recipe => (
                <CardCategoria
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.nombre}
                  image={recipe.imagenes}
                  ingredients={recipe.ingredientes}
                  category={recipe.categorias}
                  onRemove={handleRemoveFav}
                />
              ))}
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Favs;
