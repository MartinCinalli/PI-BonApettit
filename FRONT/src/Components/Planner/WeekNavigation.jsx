import React from "react";
import { IconButton, Typography, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";


const WeekNavigation = ({
  currentWeek,
  onPreviousWeek,
  onNextWeek,
  onThisWeek,
  onNextNextWeek,
}) => {
  const startOfWeek = dayjs(currentWeek)
    .startOf("isoWeek")
    .format("DD MMM YYYY");
  const endOfWeek = dayjs(currentWeek).endOf("isoWeek").format("DD MMM YYYY");
  const isThisWeek = currentWeek.isSame(dayjs().startOf("isoWeek"), "week");

  return (
    <div className="week-navigation-container">
      <div className="week-navigation-header">
        {/* {!isThisWeek && (
        )} */}
        <IconButton onClick={onPreviousWeek}>
          <ArrowBack className="white-icon" />
        </IconButton>
        <h3 className="planner-current-week">{`${startOfWeek} - ${endOfWeek}`}</h3>

        <IconButton onClick={onNextWeek}>
          <ArrowForward className="white-icon" />
        </IconButton>
      </div>
      <div className="week-navigation-buttons">
        <h5
          onClick={onThisWeek}
          className={`week-button ${isThisWeek ? "active" : ""}`}
        >
          Semana actual
        </h5>
      </div>
    </div>
  );
};

export default WeekNavigation;
