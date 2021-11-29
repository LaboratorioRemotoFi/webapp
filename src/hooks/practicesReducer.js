import React from "react";
import practicesMockData from "../mockData/practices.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "reservePracticeSchedule":
    // stuff
    case "freePracticeSchedule":
    // stuff
  }
};

const initialState = {
  practices: practicesMockData,
};

const practicesReducer = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return [state, dispatch];
};

export default practicesReducer;
