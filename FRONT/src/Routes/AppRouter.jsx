import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../Layouts";
import { Detail, Login, Register } from "../Components"; // Ajusta esta línea según tus componentes
import AdminPanel from "../Layouts/AdminPanel";
import CrearReceta from "../Components/AdminPanel/gestionRecetas/CrearReceta";
import MyAccount from "../Components/MyAccount";
import Favs from "../Layouts/Favs";
import Planner from "../Layouts/Planner";
import { UserRoute } from "./UserRoute";
import { Categoria } from "../Layouts/Categoria";
import { useContextGlobal } from "../Context";

export const AppRouter = () => {
  const { state: { categories } } = useContextGlobal();

  if (categories.length === 0) {
    return <div>Loading...</div>; // O cualquier componente de carga que prefieras
  }

  return (
    <div className="content"> {/* El contenedor principal para el contenido */}
      <Routes>
        <Route path={routes.home} element={<Home />} />

        {categories.map((categoria, i) => (
          <Route key={i} path={`/${categoria.categorias.toLowerCase()}`} element={<Categoria categoriaNombre={categoria.categorias} />} />
        ))}

        <Route path={routes.detail} element={<Detail />} />

        <Route path={routes.myAccount} element={
          <UserRoute>
            <MyAccount />
          </UserRoute>
        } />
        <Route path={routes.favs} element={
          <UserRoute>
            <Favs />
          </UserRoute>
        } />

        <Route path={routes.adminPanel} element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } /> {/* Página panel de admin */}

        <Route path={routes.crearReceta} element={
          <PrivateRoute>
            <CrearReceta />
          </PrivateRoute>
        } /> {/* Página para crear comida */}

        <Route path={routes.register} element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path={routes.planner} element={<Planner />} />

        <Route path="*" element={<h1>Página no encontrada</h1>} /> {/* Ruta de fallback para manejar rutas no definidas */}
      </Routes>
    </div>
  );
};
