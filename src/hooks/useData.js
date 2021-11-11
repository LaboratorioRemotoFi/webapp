import React from "react";
import practicesMockData from '../mockData/practices.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'reservePracticeSquedule':
      // enviar a base de datos la información de la reservación
      // Agregar la nueva reservación
      // Quitar la reservación que ya estaba
      return {
        ...state,
        practices: [
          ...state.practices,
          {
            name: action.name,
            history: [
              {
                date: "2020-01-05",
                hour: "7:00-9:00",
              },
              {
                date: "2020-01-02",
                hour: "17:00-19:00",
              },
            ],
          },
        ],
    case "addPractice":
      return {
        ...state,
        practices: [
          ...state.practices,
          {
            name: action.name,
            history: [
              {
                date: "2020-01-05",
                hour: "7:00-9:00",
              },
              {
                date: "2020-01-02",
                hour: "17:00-19:00",
              },
            ],
          },
        ],
      };
  }
};

const initialState = {
  subjects: [
    {
      name: 'Quimica',
      subjectId: 0,
    },
    {
      name: 'Mecánica',
      subjectId: 1,
    },
  ],
  practices: practicesMockData,
};

const useData = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return [state, dispatch];
};

export default useData;
