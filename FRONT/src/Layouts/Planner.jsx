import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container, Typography, IconButton, Drawer, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import WeekPlanner from "../Components/Planner/WeekPlanner";
import RecipeList from "../Components/Planner/RecipeList";
import { fetchRecipes } from "../api/api";

const Planner = () => {
  const [recipes, setRecipes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    getRecipes();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (isDragging) {
      setDrawerOpen(false);
    }
  }, [isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="planner-container">
        <div className="planner-content">
          <h1 className="title-planner">Planificador Semanal de Recetas</h1>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon className="white-icon" />
          </IconButton>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            variant="persistent"
            PaperProps={{ className: "drawer-content" }}
          >
            <Box
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <RecipeList
                recipes={recipes}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            </Box>
          </Drawer>
          <div className="week-planner">
            <WeekPlanner
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Planner;
