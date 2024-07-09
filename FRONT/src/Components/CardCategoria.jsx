import { Link } from 'react-router-dom';

export const CardCategoria = ({ id, title, image, ingredients, category, onRemove }) => {
  const imageUrl = image?.length > 0 ? image[0].urlImg : '';

  return (
    <div className="card-categoria">
      <div className="card-categoria-link">
        <div className="card-categoria-image-wrapper">
          <img src={imageUrl} alt={title} className="card-categoria-image" />
        </div>
        <div className="card-categoria-content">
          <h3 className="card-categoria-title">{title}</h3>
          <ul className="card-categoria-nutrition">
            <li>Proteína: 32g</li>
            <li>Kcal: 120</li>
          </ul>
          
          <div className="card-categoria-description">
            <h3>Ingredientes:</h3>
            <span>{ingredients}</span>
          </div>
          {
            onRemove ?
            <div className='button-card'>
              <button className="remove-button" onClick={() => onRemove(id)}>
                Eliminar de favoritos
              </button>
              <Link to={`/recipe/${id}`} className="card-categoria-button">
                Detalle...
              </Link>
            </div>
            :<Link to={`/recipe/${id}`} className="card-categoria-button">
              Detalle...
            </Link>
          }
        </div>
      </div>
    </div>
  );
};
