import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { Card, CardContent, IconButton, Modal, Box, Button } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faDrumstickBite, faBreadSlice, faTint, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Rating from "../Detail/RatingModal";

const getShortenedName = (name) => {
  if (name.length > 14) {
    return name.split(" ")[0]; // Retorna solo la primera palabra
  }
  return name;
};

const RecipeCard = ({ recipe, onDragStart, onDragEnd, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "RECIPE_CARD",
    item: () => {
      onDragStart();
      return { recipe };
    },
    end: () => {
      onDragEnd();
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [checkClicked, setCheckClicked] = useState(false);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${recipe.id}`);
    if (savedRating !== null) {
      setCheckClicked(true);
    }
  }, [recipe.id]);

  const handleCheckClick = () => {
    // setCheckClicked(true);
    setOpenConfirmModal(true);
  };

  const handleConfirm = () => {
    setOpenConfirmModal(false);
    setOpenRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setOpenRatingModal(false);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <Card
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "#dddfdc",
        borderRadius: "8px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid grey",
      }}
    >
      <Link to={`/recipe/${recipe.id}`}>
        <CardContent
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "75px",
            }}
          >
            <h5 style={{ margin: 0, fontWeight: "600", fontSize: "1.5rem" }}>
              {getShortenedName(recipe.nombre)}
            </h5>
            {recipe.imagenes && recipe.imagenes[0] && (
              <img
                src={recipe.imagenes[0].urlImg}
                alt={recipe.nombre}
                width="55"
                style={{ borderRadius: "6px", marginTop: "4px" }}
              />
            )}
          </div>
          <div className="recipecard-nutri-details">
            <ul>
              <li>
                <FontAwesomeIcon icon={faFire} />
                <p>100 Kcal</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faDrumstickBite} />
                <p>80%</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faBreadSlice} />
                <p>25%</p>
              </li>
              <li>
                <FontAwesomeIcon icon={faTint} />
                <p>12%</p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Link>

      <div>
        <IconButton onClick={handleCheckClick} style={{ padding: "5px", color: checkClicked ? 'green' : 'inherit' }}>
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
        {onDelete && (
          <IconButton onClick={onDelete} style={{ padding: "5px" }}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 500,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h2>¿Deseas calificar esta receta?</h2>
          <Button variant="contained" color="primary" onClick={handleConfirm} style={{ marginRight: "8px" }}>
            Sí
          </Button>
          <Button variant="contained" onClick={handleCloseConfirmModal}>
            No
          </Button>
        </Box>
      </Modal>

      <Modal open={openRatingModal} onClose={handleCloseRatingModal}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "16px",
          }}
        >
          <Rating recipeId={recipe.id} recipeName={recipe.nombre} onClose={handleCloseRatingModal} setCheckClicked={setCheckClicked}/>
        </Box>
      </Modal>
    </Card>
  );
};

export default RecipeCard;
