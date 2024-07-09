import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { fetchCategories, fetchRecipes } from "../../api/api";
import dayjs from "dayjs";

export const ContextGlobal = createContext();

const initialState = {
  theme: false,
  data: [],
  categories: [],
  favs: JSON.parse(localStorage.getItem('favs')) || [],
  recipeSelected: {},
  plannedWeeks: JSON.parse(localStorage.getItem("plannedWeeks")) || {},
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initializeWeek = () => ({
    Lunes: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Martes: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Miércoles: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Jueves: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Viernes: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Sábado: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
    Domingo: { Desayuno: null, Almuerzo: null, Merienda: null, Cena: null },
  });

  const moveRecipe = (date, meal, recipe) => {
    const week = date.startOf("isoWeek").format("YYYY-MM-DD");
    const day = date.format("dddd").toLowerCase();

    const daysMap = {
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
    };

    const translatedDay = daysMap[day];
    const newPlannedWeeks = { ...state.plannedWeeks };

    if (!newPlannedWeeks[week]) newPlannedWeeks[week] = initializeWeek();
    const newPlannedRecipes = { ...newPlannedWeeks[week] };
    newPlannedRecipes[translatedDay][meal] = recipe;

    newPlannedWeeks[week] = newPlannedRecipes;

    localStorage.setItem("plannedWeeks", JSON.stringify(newPlannedWeeks));
    dispatch({ type: 'EDIT_WEEK', payload: newPlannedWeeks });
  };

  useEffect(()=>{
    const currentWeek = dayjs().startOf("isoWeek")
    const currentWeekStr = currentWeek.format("YYYY-MM-DD");
    const newPlannedWeeks = { ...state.plannedWeeks };

    if (!newPlannedWeeks[currentWeekStr]) newPlannedWeeks[currentWeekStr] = initializeWeek();
    localStorage.setItem("plannedWeeks", JSON.stringify(newPlannedWeeks));
    dispatch({ type: 'EDIT_WEEK', payload: newPlannedWeeks });
  }, [])

  useEffect(() => {
    fetchRecipes().then(res => dispatch({ type: 'GET_RECIPES', payload: res }))
  }, []);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
    fetchCategories().then(res => dispatch({ type: 'GET_CATEGORIES', payload: res }))
  }, []);

  return (
    <ContextGlobal.Provider value={{ state, dispatch, initializeWeek, moveRecipe }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
