import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DayColumn from "./DayColumn";
import WeekNavigation from "./WeekNavigation";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useTransition, animated } from "@react-spring/web";
import { useContextGlobal } from "../../Context";

dayjs.extend(isoWeek);

const WeekPlanner = ({ onDragStart, onDragEnd }) => {

  const { state:{ plannedWeeks }, initializeWeek, dispatch, moveRecipe } = useContextGlobal()

  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("isoWeek"));
  const [direction, setDirection] = useState(0);
  const today = dayjs();

  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handlePreviousWeek = () => {
    setDirection(-1);
    setCurrentWeek(currentWeek.subtract(1, "week").startOf("isoWeek"));
  };

  const handleNextWeek = () => {
    setDirection(1);
    setCurrentWeek(currentWeek.add(1, "week").startOf("isoWeek"));
  };

  const handleThisWeek = () => {
    setDirection(0);
    setCurrentWeek(dayjs().startOf("isoWeek"));
  };

  // const handleNextNextWeek = () => {
    // setDirection(1);
    // setCurrentWeek(currentWeek.add(2, "week").startOf("isoWeek"));
  // };

  const currentWeekStr = currentWeek.format("YYYY-MM-DD");
  const plannedRecipes = plannedWeeks[currentWeekStr] || initializeWeek();

  const getDatesForWeek = (weekStart) =>
    days.map((_, index) => weekStart.add(index, "day"));

  const dates = getDatesForWeek(currentWeek);

  const transitions = useTransition(currentWeekStr, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: `translateX(${direction * 100}%)`,
    },
    enter: { opacity: 1, transform: `translateX(0%)` },
    leave: { opacity: 0, transform: `translateX(${direction * -100}%)` },
    config: { tension: 50, friction: 20 },
  });

  const currentMonth = currentWeek.format("MMMM YYYY");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <h2 className="planner-current-month">{currentMonth}</h2>

      <WeekNavigation
        currentWeek={currentWeek}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onThisWeek={handleThisWeek}
        // onNextNextWeek={handleNextNextWeek}
      />
      <Box position="relative" width="100%" flexGrow={1}>
        {transitions((style, item) => (
          <animated.div
            style={{ ...style, width: "100%", height: "100%" }}
            key={item}
          >
            <div className="days-container">
              {dates.map((date, index) => (
                <div key={days[index]} className="day-column">
                  <DayColumn
                    day={days[index]}
                    date={date}
                    plannedRecipes={plannedRecipes[days[index]]}
                    moveRecipe={moveRecipe}
                    isToday={date.isSame(today, "day")}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                </div>
              ))}
            </div>
          </animated.div>
        ))}
      </Box>
    </Box>
  );
};

export default WeekPlanner;
