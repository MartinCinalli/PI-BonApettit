import { Link } from 'react-router-dom';

export const Card = ({ id, title, image, description, category }) => {
  const imageUrl = image?.length > 0 ? image[0].urlImg : '';

  // Verifica si category es un array antes de mapearlo
  const categoryList = Array.isArray(category) ? category.map((cat) => (
    <span key={cat.id} className="recipe-card-category">{cat.categorias}</span>
  )) : null;

  return (
    <Link to={`/recipe/${id}`} className='recipe-card'>
      <div className="recipe-card-front" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)), 
                                                                    url(${imageUrl})` }}>
        <h3 className="title-card">{title}</h3>
      </div>
      <div className="recipe-card-back">
        {categoryList}
        <p className="recipe-card-description">{description}</p>
      </div>
    </Link>
  );
};