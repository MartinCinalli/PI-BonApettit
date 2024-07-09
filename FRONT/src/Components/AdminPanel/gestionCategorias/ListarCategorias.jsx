import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
  createCategory,
} from "../../../api/api";
import CrearCategoria from "./CrearCategoria";
import EditarCategoria from "./EditarCategoria";
import "./ListarCategorias.css";
import { useContextGlobal } from "../../../Context/Recetas/global.context";

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showCrearCategoria, setShowCrearCategoria] = useState(false);
  const [showEditarCategoria, setShowEditarCategoria] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { dispatch } = useContextGlobal()

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      const data = await fetchCategories();
      if (data) {
        setCategorias(data);
      } else {
        alert("Error al cargar categorías.");
      }
    } catch (error) {
      alert("Error al cargar categorías.");
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const borrarCategoria = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta categoría? Si lo haces, las recetas vinculadas se borrarán de la base de datos.")) {
      try {
        const success = await deleteCategory(id);
        if (success) {
          getCategorias();
          dispatch({ type: 'REMOVE_CATEGORY', payload: id });
        } else {
          alert("Error al eliminar la categoría.");
        }
      } catch (error) {
        alert("Error al eliminar la categoría.");
      }
    }
  };

  return (
    <div className="listar-categorias-container">
      <div className="listar-categorias-header">
        <div>
          <h1 className="listar-categorias-title">Lista de Categorías</h1>
          <p className="listar-recetas-total">
            Total: {categorias.length}
          </p>
        </div>
        <button
          className="listar-categorias-add-btn"
          onClick={() => setShowCrearCategoria(true)}
        >
          Agregar Categoría
        </button>
      </div>

      <div className="listar-categorias-filters">
        <div className="listar-categorias-search">
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="listar-categorias-sort">
          <label>Ordenar por ID:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <table className="listar-categorias-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciónes</th>
          </tr>
        </thead>
        <tbody>
          {categorias
            .filter((categoria) =>
              categoria.categorias
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id))
            .map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.categorias}</td>
                <td>{categoria.descripcion}</td>
                <td className="image-cell">
                  <img src={categoria.urlImg} alt={categoria.categorias} className="category-img"/>
                </td>
                <td >
                  <button
                    type="button"
                    className="listar-categorias-btn listar-categorias-edit-btn"
                    onClick={() => {
                      setSelectedCategoryId(categoria.id);
                      setShowEditarCategoria(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="listar-categorias-btn listar-categorias-delete-btn"
                    onClick={() => borrarCategoria(categoria.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showCrearCategoria && (
        <CrearCategoria
          closeModal={() => setShowCrearCategoria(false)}
          fetchCategories={getCategorias}
        />
      )}

      {showEditarCategoria && (
        <div className="listar-categorias-modal">
          <div className="listar-categorias-modal-content">
            <EditarCategoria
              closeModal={() => setShowEditarCategoria(false)}
              fetchCategories={getCategorias}
              id={selectedCategoryId} // Aquí pasamos el id como prop
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarCategorias;
