import { useEffect, useState } from 'react'
import { createCaracteristica, fetchCaracteristicas } from '../../../api/api';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { firebaseDB } from '../../../api/firebase';

export const CrearCaracteristica = ({
  closeModal,
  fetchCaracteristicas: fetchCaracteristicasParent,
}) => {

  const [caracteristicas, setCaracteristicas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    getCaracteristicas();
  }, []);

  const getCaracteristicas = async () => {
      try {
        const data = await fetchCaracteristicas();
        if (data) {
          setCaracteristicas(data);
        } else {
          alert("Error al cargar características.");
        }
      } catch (error) {
        alert("Error al conectar con el servidor para cargar características.");
      }
    };

  const handleChangeName = (e) => {
    setNombre(e.target.value);
  };
  const handleChangeIcono = (e) => {
    setIcono(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si la característica ya existe
    if (
      caracteristicas.some(
        (caracteristica) =>
          caracteristica.nombre &&
          caracteristica.nombre.toLowerCase() === nombre.toLowerCase()
      )
    ) {
      setValidationError("Característica ya existente.");
      return;
    }

    const storageRef = ref(firebaseDB, `/caracteristicas/${icono.name}`)

    // Crear la nueva característica
    try {
      await uploadBytes(storageRef, icono)
      const url = await getDownloadURL(storageRef)
      const success = await createCaracteristica({ nombre: nombre, urlImg: url });
      if (success) {
        alert("Caracteristica creada exitosamente.");
        closeModal();
        fetchCaracteristicasParent(); // Actualizar la lista de categorías
      } else {
        alert("No se pudo crear la característica.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="title">Agregar Característica</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={nombre}
            onChange={handleChangeName}
          />
          <span className="error-text">{validationError}</span>
        </div>
        <div className="form-group">
          <label>Icono</label>
          <input
            className="form-control"
            type='file'
            name="icono"
            // value={icono}
            onChange={handleChangeIcono}
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
  )
}
