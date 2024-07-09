import React, { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../../../api/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "../../../api/firebase";
import { useContextGlobal } from "../../../Context/Recetas/global.context";

const EditarCategoria = ({
  closeModal,
  id,
  fetchCategories: fetchCategoriesParent,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [validationError, setValidationError] = useState("");

  const [data, setData] = useState({
    id: '',
    categorias: '',
    descripcion: '',
    urlImg: '',
  });

  const {state:{ categories }, dispatch} = useContextGlobal()
  const categoria = categories.filter( category => category.id === id )

  useEffect(() => {
    setCategoria(categoria)
  }, []);

  const setCategoria = (category) => {
    const [{ categorias, descripcion, urlImg }] = category
    setNombre(categorias);
    setDescripcion(descripcion)
    setImagen(urlImg)
    setData(category[0]);
  }

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      categorias: nombre,
      descripcion: descripcion,
      urlImg: imagen,
    }));
  }, [nombre, descripcion, imagen]);

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

    // Validar si el nombre de la categoría no está vacío
    if (!nombre.trim()) {
      setValidationError("El nombre de la categoría no puede estar vacío.");
      return;
    }

    if (!descripcion.trim()) {
      setValidationError("El nombre de la categoría no puede estar vacío.");
      return;
    }

    const storageRef = ref(firebaseDB, `/categorias/${imagen.name}`)

    // Actualizar la categoría existente
    try {
      await uploadBytes(storageRef, imagen)
      const url = await getDownloadURL(storageRef)
      const img = imagen.name ? url : data.urlImg
      const success = await updateCategory({ id: data.id, categorias: data.categorias, descripcion: data.descripcion, urlImg: img });
      if (success) {
        alert("Categoría actualizada exitosamente.");
        closeModal();
        dispatch({ type: 'EDIT_CATEGORY', payload: { id: data.id, categorias: data.categorias, descripcion: data.descripcion, urlImg: img } });
        fetchCategoriesParent(); // Actualizar la lista de categorías
      } else {
        alert("No se pudo actualizar la categoría.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="listar-recetas-modal">
      <div className="listar-recetas-modal-content">
        <div className="form-wrapper">
          <h2 className="title">Editar Categoría</h2>
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
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarCategoria;
