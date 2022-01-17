import { useReducer } from "react";
import studentMockData from "../mockData/student.js";

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "studentLogin":
      return {
        ...state,
      };
    default:
      return state;
  }
};

const initialState = {
  user: studentMockData.user,
  subjects: studentMockData.subjects,
  groups: studentMockData.groups,
  practices: studentMockData.practices,
};

export { initialState };
export default studentsReducer;
