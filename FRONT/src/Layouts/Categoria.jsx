import { useContext, useState, useEffect } from 'react';
import { CardCategoria, SearchBar } from '../Components';
import { ContextGlobal } from '../Context';

export const Categoria = ({ categoriaNombre }) => {
  const { state } = useContext(ContextGlobal);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');

  const recipesPerPage = 8; // 4 por columna

  useEffect(() => {
    const filteredRecipes = state.data.filter(recipe =>
      recipe.categorias.some(category => category.categorias === categoriaNombre)
    );
    setCategoryRecipes(filteredRecipes);
    const title = filteredRecipes.length > 0 
      ? filteredRecipes[0].categorias.find(category => category.categorias === categoriaNombre).categorias 
      : categoriaNombre;
    setCategoryTitle(title);
  }, [categoriaNombre, state.data]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(categoryRecipes.length / recipesPerPage);

  // Obtener las recetas de la página actual
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const recipes = categoryRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="category-container">
      <SearchBar />
      <div className='title-container'>
        <h1 className="category-title">{categoryTitle}</h1>
      </div>
      <div className="category-recipes">
        {categoryRecipes.length > 0 ? (
          recipes.map(recipe => (
            <CardCategoria
              key={recipe.id}
              title={recipe.nombre}
              image={recipe.imagenes}
              description={recipe.descripcion}
              category={recipe.categorias}
              id={recipe.id}
              ingredients={recipe.ingredientes}
            />
          ))
        ) : (
          <h1>Aún no hay recetas para esta categoría</h1>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} className="nav-button-category">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="page-number">{currentPage}</div>
        <button onClick={handleNextPage} className="nav-button-category">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
