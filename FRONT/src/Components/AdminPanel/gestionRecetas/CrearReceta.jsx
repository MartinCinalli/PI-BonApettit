import { useEffect, useState } from "react";
import {
  fetchCategories,
  createRecipe,
  fetchCaracteristicas,
} from "../../../api/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseDB } from "../../../api/firebase";
import "./CrearReceta.css";

const CrearReceta = ({ closeModal, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    instrucciones: "",
    caracteristicas: [],
    categorias: [],
    imagenes: [""],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [imageLoadError, setImageLoadError] = useState([false]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetchCategories();
    if (data) {
      setCategorias(data);
    } else {
      alert("Error al cargar categorías.");
    }
    data = await fetchCaracteristicas();
    if (data) {
      setCaracteristicas(data);
    } else {
      alert("Error al cargar características.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions).map((option) => option.value);
      setFormData({
        ...formData,
        [name]: values,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = async (index, imagen) => {
    const updatedImages = [...formData.imagenes];
    const storageRef = ref(
      firebaseDB,
      `/recetas/${formData.nombre}/${imagen.name}`
    );

    try {
      await uploadBytes(storageRef, imagen);
      const url = await getDownloadURL(storageRef);
      updatedImages[index] = url;

      setFormData({
        ...formData,
        imagenes: updatedImages,
      });
    } catch (e) {
      console.log(e);
    }

    const updatedErrors = [...imageLoadError];
    updatedErrors[index] = false; // Reset error state when the image URL changes
    setImageLoadError(updatedErrors);
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      imagenes: [...formData.imagenes, ""],
    });
    setImageLoadError([...imageLoadError, false]);
  };

  const removeImageField = (index) => {
    const updatedImages = formData.imagenes.filter((_, i) => i !== index);
    const updatedErrors = imageLoadError.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      imagenes: updatedImages.length > 0 ? updatedImages : [""],
    });
    setImageLoadError(updatedErrors.length > 0 ? updatedErrors : [false]);
  };

  const handleImageError = (index) => {
    const updatedErrors = [...imageLoadError];
    updatedErrors[index] = true;
    setImageLoadError(updatedErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      caracteristicas,
      categorias,
      imagenes,
    } = formData;

    if (
      !nombre ||
      !descripcion ||
      !ingredientes ||
      !instrucciones ||
      caracteristicas.length === 0 ||
      categorias.length === 0 ||
      imagenes.length === 0 ||
      imagenes.some((image) => image.trim() === "")
    ) {
      alert("Por favor ingrese todos los campos.");
      return;
    }

    try {
      const receta = {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        caracteristicas: caracteristicas.map((category) => parseInt(category)),
        categorias: categorias.map((category) => parseInt(category)),
        imagenes: imagenes.filter((image) => image.trim() !== ""),
      };

      const createResponse = await createRecipe(receta);

      if (createResponse.success) {
        alert("Receta creada exitosamente.");
        closeModal();
        fetchRecipes(); // Actualizar la lista de recetas
      } else if (createResponse.error) {
        alert("No se pudo cargar la receta.");
      } else {
        setValidationErrors(createResponse);
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content crear-receta-container">
        <div className="form-wrapper">
          <h2 className="title">Agregar Recetas</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <span className="error-text">{validationErrors.nombre}</span>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                rows="1"
                value={formData.descripcion}
                onChange={handleChange}
              />
              <span className="error-text">{validationErrors.descripcion}</span>
            </div>

            <div className="form-group row">
              <div className="col">
                <label>Ingredientes</label>
                <textarea
                  className="form-control"
                  name="ingredientes"
                  rows="2"
                  value={formData.ingredientes}
                  onChange={handleChange}
                />
                <span className="error-text">
                  {validationErrors.ingredientes}
                </span>
              </div>
              <div className="col">
                <label>Instrucciones</label>
                <textarea
                  className="form-control"
                  name="instrucciones"
                  rows="2"
                  value={formData.instrucciones}
                  onChange={handleChange}
                />
                <span className="error-text">
                  {validationErrors.instrucciones}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <div className="col">
                <label>Categoría</label>
                <select
                  className="form-control select-categorias"
                  name="categorias"
                  multiple
                  value={formData.categorias}
                  onChange={handleChange}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.categorias}
                    </option>
                  ))}
                </select>
                <span className="error-text">{validationErrors.categoria}</span>
              </div>
              <div className="col">
                <label>Características</label>
                <select
                  className="form-control select-categorias"
                  name="caracteristicas"
                  multiple
                  value={formData.caracteristicas}
                  onChange={handleChange}
                >
                  {caracteristicas.map((caracteristica) => (
                    <option key={caracteristica.id} value={caracteristica.id}>
                      {caracteristica.nombre}
                    </option>
                  ))}
                </select>
                <span className="error-text">
                  {validationErrors.caracteristica}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Imágenes</label>
              <div className="image-container">
                {formData.imagenes.map((imagen, index) => (
                  <div key={index} className="image-field">
                    <input
                      className="form-control"
                      name={`imagen-${index}`}
                      type="file"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                    {imagen && !imageLoadError[index] ? (
                      <img
                        src={imagen}
                        alt={`Imagen ${index + 1}`}
                        className="preview-image"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        🚫 Imagen no disponible
                      </div>
                    )}
                    {formData.imagenes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="add-image-btn-container">
                <button
                  type="button"
                  className="add-image-btn"
                  onClick={addImageField}
                >
                  +
                </button>
              </div>
              <span className="error-text">{validationErrors.imagenes}</span>
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

export default CrearReceta;
