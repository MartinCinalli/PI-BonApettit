import React from 'react'

const RecipeDetails = ({categorias, descripcion, ingredientes, instrucciones}) => {

  return (
    <div className='recipe-detail-data'>
      
      <p>{ingredientes}</p>
      
      <p>{instrucciones}</p>
      <p>{descripcion}</p>
    </div>
  )
}

export default RecipeDetails