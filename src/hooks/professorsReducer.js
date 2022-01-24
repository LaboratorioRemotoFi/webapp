import { useReducer } from "react";
import professorMockData from "../mockData/professor.js";

const professorsReducer = (state, action) => {
  switch (action.type) {
    case "professorLogin":
      return {
        ...state,
      };
  }
};

const initialState = {
  user: professorMockData.user,
  subjects: professorMockData.subjects,
  groups: professorMockData.groups,
  practices: professorMockData.practices,
  students: professorMockData.students,
};

export { initialState };
export default professorsReducer;
