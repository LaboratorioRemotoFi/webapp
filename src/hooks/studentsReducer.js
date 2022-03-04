import { useReducer } from "react";
import studentMockData from "../mockData/student.js";

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "setGroups":
      return {
        ...state,
        groups: action.groups,
      };
    case "setPractices":
      return {
        ...state,
        practices: action.practices,
      };
    case "reserveSchedule":
      let updatedSchedules = [
        ...state.practices[action.payload.currPracticeId].reservedSchedules,
      ];

      // If currentStudentSchedule has a value, find its index in the reservedSchedules array
      // and delete it
      if (
        !isNaN(
          state.practices[action.payload.currPracticeId].currentStudentSchedule
        )
      ) {
        let removedScheduleIndex = updatedSchedules.findIndex(function (
          scheduleObj,
          index
        ) {
          if (
            scheduleObj.schedule ==
            state.practices[action.payload.currPracticeId]
              .currentStudentSchedule
          )
            return true;
        });
        updatedSchedules.splice(removedScheduleIndex, 1);
      }
      updatedSchedules.push(action.payload.reservedSchedule);
      return {
        ...state,
        practices: {
          ...state.practices,
          [action.payload.currPracticeId]: {
            ...state.practices[action.payload.currPracticeId],
            currentStudentSchedule: action.payload.reservedSchedule.schedule,
            reservedSchedules: updatedSchedules,
          },
        },
      };
    default:
      return {
        ...state,
      };
  }
};

function updateCurrStudentPracticeAttr(studentId, practices) {
  let practicesIndexes = Object.keys(practices);
  for (let i = 0; i < practicesIndexes.length; i++) {
    let currPracticeSchedules =
      practices[practicesIndexes[i]].reservedSchedules;
    for (let j = 0; j < currPracticeSchedules.length; j++) {
      if (currPracticeSchedules[j]?.studentId == studentId) {
        practices[practicesIndexes[i]].currentStudentSchedule =
          currPracticeSchedules[j].schedule;
        break;
      }
    }
  }
  return practices;
}

const initialState = {
  // groups: studentMockData.groups,
  /* practices: updateCurrStudentPracticeAttr(
   *   studentMockData.user.id,
   *   studentMockData.practices
   * ), */
};

export { initialState };
export default studentsReducer;
