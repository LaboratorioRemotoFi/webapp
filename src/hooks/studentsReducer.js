import { useReducer } from "react";
import studentMockData from "../mockData/student.js";

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "studentLogin":
      return {
        ...state,
      };
    case "reserveSchedule":
      //let updatedPractices = JSON.parse(JSON.stringify(state.practices));
      // TODO: Don't modify the state
      let updatedPractices = state.practices;
      /* console.log("state.practices");
      console.log(state.practices);
      console.log("updatedPractices");
      console.log(updatedPractices);
      console.log(updatedPractices[state.currPractice.id]); */
      updatedPractices[action.payload.currPractice].reservedSchedules.push(
        action.payload.reservedSchedule
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
};

export { initialState };
export default studentsReducer;
