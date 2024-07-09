import React from "react";
import { Box, Typography } from "@mui/material";
import MealArea from "./MealArea";
import { useDrop } from "react-dnd";

const DayColumn = ({
  day,
  date,
  plannedRecipes,
  moveRecipe,
  isToday,
  onDragStart,
  onDragEnd,
}) => {
  // const [, drop] = useDrop({
  //   accept: "RECIPE_CARD",
  //   drop: (item) => {
  //     moveRecipe(date, item.meal, item.recipe); // Ajusta "meal" según tu lógica
  //   },
  // });

  return (
    <Box
      // ref={drop}
      display="flex"
      flexDirection="column"
      className="day-column"
    >
      <h4 className={`day-title ${isToday ? "today" : ""}`}>
        {day} {date.date()}
      </h4>

      <Box flex="1">
        <MealArea
          title="Desayuno"
          date={date}
          plannedRecipe={plannedRecipes?.Desayuno}
          moveRecipe={moveRecipe}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
        <MealArea
          title="Almuerzo"
          date={date}
          plannedRecipe={plannedRecipes?.Almuerzo}
          moveRecipe={moveRecipe}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
        <MealArea
          title="Merienda"
          date={date}
          plannedRecipe={plannedRecipes?.Merienda}
          moveRecipe={moveRecipe}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
        <MealArea
          title="Cena"
          date={date}
          plannedRecipe={plannedRecipes?.Cena}
          moveRecipe={moveRecipe}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      </Box>
    </Box>
  );
};

export default DayColumn;
