import { useEffect, useState } from 'react'
import { CrearCaracteristica } from './CrearCaracteristica';
import { EditarCaracteristica } from './EditarCaracteristica';
import { deleteCaracteristica, fetchCaracteristicas } from '../../../api/api';

export const ListarCaracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [showCrearCaracteristica, setShowCrearCaracteristica] = useState(false);
  const [showEditarCaracteristica, setShowEditarCaracteristica] = useState(false);
  const [selectedCaracteristicaId, setSelectedCaracteristicaId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getCaracteristicas();
  }, []);

  const getCaracteristicas = async () => {
    try {
      const data = await fetchCaracteristicas();
      if (data) {
        setCaracteristicas(data);
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

  const borrarCaracteristica = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta característica? Si lo haces, las recetas con esta distinción se veran afectadas.")) {
      try {
        const success = await deleteCaracteristica(id);
        if (success) {
          getCaracteristicas();
        } else {
          alert("Error al eliminar la característica.");
        }
      } catch (error) {
        alert("Error al eliminar la característica.");
      }
    }
  };

  return (
    <div className="listar-categorias-container">
      <div className="listar-categorias-header">
        <div>
          <h1 className="listar-categorias-title">Lista de Características</h1>
          <p className="listar-recetas-total">
            Total: {caracteristicas.length}
          </p>
        </div>
        <button
          className="listar-categorias-add-btn"
          onClick={() => setShowCrearCaracteristica(true)}
        >
          Agregar Característica
        </button>
      </div>

      <div className="listar-categorias-filters">
        <div className="listar-categorias-search">
          <input
            type="text"
            placeholder="Buscar característica..."
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
            {/* <th>Descripción</th> */}
            <th>Imagen</th>
            <th>Acciónes</th>
          </tr>
        </thead>
        <tbody>
          {caracteristicas
            .filter((categoria) =>
              categoria.nombre
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id))
            .map((caracteristica) => (
              <tr key={caracteristica.id}>
                <td>{caracteristica.id}</td>
                <td>{caracteristica.nombre}</td>
                <td className='image-cell'>
                  <img src={caracteristica.urlImg} alt={caracteristica.nombre} className='characteristic-img'/>
                </td>
                <td>
                  <button
                    type="button"
                    className="listar-categorias-btn listar-categorias-edit-btn"
                    onClick={() => {
                      setSelectedCaracteristicaId(caracteristica.id);
                      setShowEditarCaracteristica(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="listar-categorias-btn listar-categorias-delete-btn"
                    onClick={() => borrarCaracteristica(caracteristica.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showCrearCaracteristica && (
        <div className="listar-categorias-modal">
          <div className="listar-categorias-modal-content">
            <CrearCaracteristica
              closeModal={() => setShowCrearCaracteristica(false)}
              fetchCaracteristicas={getCaracteristicas}
            />
          </div>
        </div>
      )}

      {showEditarCaracteristica && (
        <div className="listar-categorias-modal">
          <div className="listar-categorias-modal-content">
            <EditarCaracteristica
              closeModal={() => setShowEditarCaracteristica(false)}
              fetchCaracteristicas={getCaracteristicas}
              id={selectedCaracteristicaId} // Aquí pasamos el id como prop
            />
          </div>
        </div>
      )}
    </div>
  )
}
