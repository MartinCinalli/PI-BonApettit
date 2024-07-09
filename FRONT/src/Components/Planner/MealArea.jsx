import React from "react";
import { useDrop } from "react-dnd";
import { Paper, Typography, Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

const MealArea = ({
  title,
  date,
  plannedRecipe,
  moveRecipe,
  onDragStart,
  onDragEnd,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "RECIPE_CARD",
    drop: (item) => {
      if (item.recipe) {
        moveRecipe(date, title, item.recipe);
      } else {
        console.error("Dropped item has no recipe:", item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDelete = () => {
    moveRecipe(date, title, null);
  };

  let color;
  switch (title) {
    case "Desayuno":
      color = "#731627";
      break;
    case "Almuerzo":
      color = "#736830";
      break;
    case "Merienda":
      color = "#bf9969";
      break;
    case "Cena":
      color = "#59483e";
      break;
    default:
      color = "#dddfdc";
  }

  return (
    <Grid item xs={12}>
      <Paper
        ref={drop}
        className="meal-area"
        style={{
          backgroundColor: isOver ? "#e0e0e0" : color,
          padding: "16px",
          minHeight: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          borderRadius: "15px",
        }}
      >
        <h4 className="meal-area-h4">{title}</h4>

        {plannedRecipe ? (
          <RecipeCard
            recipe={plannedRecipe}
            onDelete={handleDelete}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ) : (
          <h6 className="planner-h6">Arrastre una receta aqui</h6>
        )}
      </Paper>
    </Grid>
  );
};

export default MealArea;
