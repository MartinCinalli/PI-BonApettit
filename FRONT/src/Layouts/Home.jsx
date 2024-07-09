import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recomendados, SearchBar } from '../Components';
import { fetchCategories } from '../api/api';

export const Home = () => {

  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetchCategories().then( resp => setCategorias(resp) )
  }, [])

  // const categories = [
  //   { path: '/desayuno', title: 'DESAYUNO', description: '"Comienza tu día con energía y vitalidad con nuestras recetas de desayuno. Desde opciones rápidas y saludables hasta platos más elaborados para los fines de semana, encontrarás una variedad de recetas que te ayudarán a empezar la mañana de la mejor manera."', image: '../../public/Images/Desayuno.jpeg' },
  //   { path: '/almuerzo', title: 'ALMUERZO', description: '"Disfruta de un almuerzo delicioso y nutritivo con nuestras variadas recetas. Ya sea que busques platos ligeros para mantenerte activo durante el día o comidas sustanciosas que te llenen de energía, tenemos la receta perfecta para cada ocasión."', image: '../../public/Images/Almuerzo.jpeg' },
  //   { path: '/mediatarde', title: 'MERIENDA', description: '"Recarga energías a media tarde con nuestras deliciosas recetas de merienda. Encuentra desde snacks saludables y fáciles de preparar hasta dulces tentaciones que te alegrarán el día. Perfectas para disfrutar solo o compartir con amigos y familia."', image: '../../public/Images/Merienda.jpg' },
  //   { path: '/cena', title: 'CENA', description: '"Termina tu día con una cena reconfortante y sabrosa. Nuestras recetas de cena están diseñadas para ser nutritivas y deliciosas, ofreciendo una variedad de opciones que te ayudarán a relajarte y disfrutar de una comida completa antes de descansar."', image: '../../public/Images/Cena.jpeg' },
  // ];

  return (
    <div className="home">
      <SearchBar />
      <div className="card-container">
        {categorias.map((category, index) => (
          <Link to={`/${category.categorias.toLowerCase()}`} className="card" key={index}>
            <div className="card-front"
              style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.4)), 
                                          url(${category.urlImg})` }}>
              <h1 className='bordelindo title-card'>{category.categorias}</h1>
            </div>
            <div className="card-back">
              <p>{category.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>
      <Recomendados />
    </div>
  );
};

