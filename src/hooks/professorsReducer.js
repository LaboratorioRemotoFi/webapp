import { useReducer } from "react";
import professorMockData from "../mockData/professor.js";

const professorsReducer = (state, action) => {
  switch (action.type) {
    case "professorLogin":
      return {
        ...state,
        //isAuthenticated: true,
      };
  }
};

const initialState = {
  user: professorMockData.user,
  subjects: professorMockData.subjects,
  groups: professorMockData.groups,
  practices: professorMockData.practices,
};

export { initialState };
export default professorsReducer;
