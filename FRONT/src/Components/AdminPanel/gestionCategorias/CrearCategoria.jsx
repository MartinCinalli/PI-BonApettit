import React, { useEffect, useState } from "react";
import { fetchCategories, createCategory } from "../../../api/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "../../../api/firebase";
import { useContextGlobal } from "../../../Context/Recetas/global.context";

const CrearCategoria = ({
  closeModal,
  fetchCategories: fetchCategoriesParent,
}) => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [validationError, setValidationError] = useState("");
  const { dispatch } = useContextGlobal()

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const data = await fetchCategories();
        if (data) {
          setCategorias(data);
        } else {
          alert("Error al cargar categorías.");
        }
      } catch (error) {
        alert("Error al conectar con el servidor para cargar categorías.");
      }
    };
    getCategorias();
  }, []);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const handleChangeImagen = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si la categoría ya existe
    if (
      categorias.some(
        (categoria) =>
          categoria.categorias &&
          categoria.categorias.toLowerCase() === nombre.toLowerCase()
      )
    ) {
      setValidationError("Categoría ya existente.");
      return;
    }

    const storageRef = ref(firebaseDB, `/categorias/${imagen.name}`)
    // Crear la nueva categoría
    try {
      await uploadBytes(storageRef, imagen)
      const url = await getDownloadURL(storageRef)
      const success = await createCategory({ categorias: nombre, descripcion: descripcion, urlImg: url });
      if (success) {
        alert("Categoría creada exitosamente.");
        closeModal();
        dispatch({ type: 'ADD_CATEGORY', payload: { categorias: nombre, descripcion: descripcion, urlImg: url } });
        fetchCategoriesParent(); // Actualizar la lista de categorías
      } else {
        alert("No se pudo crear la categoría.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="listar-recetas-modal">
      <div className="listar-recetas-modal-content">
        <div className="form-wrapper">
          <h2 className="title">Agregar Categoría</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                name="nombre"
                value={nombre}
                onChange={handleChangeNombre}
              />
              <span className="error-text">{validationError}</span>
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <input
                className="form-control"
                name="descripcion"
                value={descripcion}
                onChange={handleChangeDescripcion}
              />
              <span className="error-text">{validationError}</span>
            </div>
            <div className="form-group">
              <label>Imágen</label>
              <input
                className="form-control"
                type="file"
                name="imagen"
                // value={nombre}
                onChange={handleChangeImagen}
              />
              <span className="error-text">{validationError}</span>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button type="submit" className="btn submit-btn">
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearCategoria;
