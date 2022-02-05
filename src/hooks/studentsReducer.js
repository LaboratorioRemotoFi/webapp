import { useReducer } from "react";
import studentMockData from "../mockData/student.js";

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "studentLogin":
      return {
        ...state,
      };
    case "reserveSchedule":
      let updatedSchedules = [
        ...state.practices[action.payload.currPracticeId].reservedSchedules,
      ];

      // If currentStudentSchedule has a value, find its index in the reservedSchedules array
      // and delete it
      if (
        !isNaN(state.practices[action.payload.currPracticeId]
          .currentStudentSchedule)
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
  console.log(studentId);
  let practicesIndexes = Object.keys(practices);
  for (let i = 0; i < practicesIndexes.length; i++) {
    console.log(practices[practicesIndexes[i]].name);
    let currPracticeSchedules =
      practices[practicesIndexes[i]].reservedSchedules;
    console.log(currPracticeSchedules);
    for (let j = 0; j < currPracticeSchedules.length; j++) {
      console.log(currPracticeSchedules[j]?.studentId);
      if (currPracticeSchedules[j]?.studentId == studentId) {
        practices[practicesIndexes[i]].currentStudentSchedule =
          currPracticeSchedules[j].schedule;
        console.log("TRUE");
        console.log(practices[practicesIndexes[i]].currentStudentSchedule);
        break;
      }
    }
  }
  return practices;
}

const initialState = {
  user: studentMockData.user,
  subjects: studentMockData.subjects,
  groups: studentMockData.groups,
  practices: updateCurrStudentPracticeAttr(
    studentMockData.user.id,
    studentMockData.practices
  ),
};

export { initialState };
export default studentsReducer;
