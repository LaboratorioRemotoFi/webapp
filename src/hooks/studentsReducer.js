import { useReducer } from "react";
import studentMockData from "../mockData/student.js";

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "studentLogin":
      return {
        ...state,
      };
    case "updateCurrentPractice":
      return {
        ...state,
        currPractice: action.payload,
      };
    case "reserveSchedule":
      //let updatedPractices = JSON.parse(JSON.stringify(state.practices));
      let updatedPractices = state.practices;
      /* console.log("state.practices");
      console.log(state.practices);
      console.log("updatedPractices");
      console.log(updatedPractices);
      console.log(updatedPractices[state.currPractice.id]); */
      updatedPractices[state.currPractice.id].reservedSchedules.push(
        action.payload
      );
      return {
        ...state,
        practices: updatedPractices,
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
  currPractice: "",
};

export { initialState };
export default studentsReducer;
