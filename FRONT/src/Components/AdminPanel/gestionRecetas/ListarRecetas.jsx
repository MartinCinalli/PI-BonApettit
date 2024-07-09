import React, { useEffect, useState } from "react";
import EditarReceta from "./EditarReceta";
import CrearReceta from "./CrearReceta"; // Importar CrearReceta

import {
  fetchCategories,
  fetchRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../../api/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ListarRecetas.css";

const ListarRecetas = ({ recipes, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [showEditarReceta, setShowEditarReceta] = useState(false);
  const [showCrearReceta, setShowCrearReceta] = useState(false); // Estado para mostrar CrearReceta
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Cambiar a selectedRecipe
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageLoadError, setImageLoadError] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchRecipes();
    getCategorias();
  }, []);

  const getCategorias = async () => {
    const data = await fetchCategories();
    if (data) {
      setCategorias(data);
    } else {
      alert("Error al cargar categorías.");
    }
  };

  const borrarReceta = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta receta?")) {
      const success = await deleteRecipe(id);
      if (success) {
        fetchRecipes();
      } else {
        alert("Error al eliminar la receta.");
      }
    }
  };

  const handleImageError = (recipeId, imgIndex) => {
    setImageLoadError((prevErrors) => ({
      ...prevErrors,
      [recipeId]: { ...prevErrors[recipeId], [imgIndex]: true },
    }));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const sortedRecipes = recipes
    .slice()
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  const filteredRecipes =
    selectedCategories.length === 0
      ? sortedRecipes
      : sortedRecipes.filter((recipe) =>
          selectedCategories.some((cat) =>
            recipe.categorias.map((c) => c.categorias).includes(cat)
          )
        );

  const searchedRecipes = filteredRecipes.filter((recipe) =>
    recipe.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(searchedRecipes.length / recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1); // Resetear a la primera página al cambiar la selección de categoría
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="listar-recetas-container">
      <div className="listar-recetas-header">
        <div>
          <h1 className="listar-recetas-title">Lista de Recetas</h1>
          <p className="listar-recetas-total">
            Total de recetas: {recipes.length}
          </p>
        </div>
        <button
          className="listar-recetas-add-btn"
          onClick={() => setShowCrearReceta(true)} // Mostrar el modal de CrearReceta
        >
          Agregar Receta
        </button>
      </div>

      <div className="listar-recetas-filters">
        <div className="listar-recetas-search">
          <input
            type="text"
            placeholder="Buscar receta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="listar-recetas-category-sort">
          <div className="listar-recetas-category-filter">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className={`listar-recetas-categoria-card ${
                  selectedCategories.includes(categoria.categorias)
                    ? "active"
                    : ""
                }`}
                onClick={() => handleCategoryClick(categoria.categorias)}
              >
                {categoria.categorias}
              </div>
            ))}
          </div>
        </div>
        <div className="listar-recetas-sort">
          <label>Ordenar por ID:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <table className="listar-recetas-table">
        <thead>
          <tr>
            <td colSpan="8">
              Filtrado por:{" "}
              {selectedCategories.length === 0
                ? "Mostrar todas"
                : selectedCategories.join(", ")}
            </td>
          </tr>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ingredientes</th>
            <th>Modo de preparación</th>
            <th>Categoría</th>
            <th>Características</th>
            <th>Imágenes</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentRecipes.map((receta, index) => (
            <tr key={index}>
              <td>{receta.id}</td>
              <td>{receta.nombre}</td>
              <td>{receta.ingredientes}</td>
              <td>{receta.instrucciones}</td>
              <td>
                {receta.categorias
                  .map((categoria) => categoria.categorias)
                  .join(", ")}
              </td>
              <td>
                {receta.caracteristicas
                  .map((caracteristica) => caracteristica.nombre)
                  .join(", ")}
              </td>
              <td className="listar-recetas-imagenes-column">
                <div className="listar-recetas-carousel-container">
                  <Carousel showThumbs={false}>
                    {receta.imagenes.map((imagen, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="listar-recetas-carousel-slide"
                      >
                        {imageLoadError[receta.id] &&
                        imageLoadError[receta.id][imgIndex] ? (
                          <div className="listar-recetas-no-image-placeholder">
                            🚫 Imagen no disponible
                          </div>
                        ) : (
                          <img
                            src={imagen.urlImg}
                            alt={`Imagen ${imgIndex}`}
                            className="listar-recetas-carousel-image"
                            onError={() =>
                              handleImageError(receta.id, imgIndex)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </Carousel>
                </div>
              </td>
              <td className="listar-recetas-action-buttons">
                <button
                  type="button"
                  className="listar-recetas-btn listar-recetas-edit-btn"
                  onClick={() => {
                    setSelectedRecipe(receta);
                    setShowEditarReceta(true);
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="listar-recetas-btn listar-recetas-delete-btn"
                  onClick={() => borrarReceta(receta.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="listar-recetas-pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`listar-recetas-page-number ${
              number === currentPage ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {showEditarReceta && (
        <div className="modal">
          <div className="modal-content-wrapper">
            <div className="modal-content">
              <EditarReceta
                recipeId={selectedRecipe.id} // Pasar el ID de la receta seleccionada
                initialRecipe={selectedRecipe} // Pasar la receta seleccionada como initialRecipe
                closeModal={() => setShowEditarReceta(false)}
                fetchRecipes={fetchRecipes}
              />
            </div>
          </div>
        </div>
      )}

      {showCrearReceta && (
        <div className="modal">
          <div className="modal-content-wrapper">
            <div className="modal-content">
              <CrearReceta
                closeModal={() => setShowCrearReceta(false)}
                fetchRecipes={fetchRecipes}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarRecetas;
