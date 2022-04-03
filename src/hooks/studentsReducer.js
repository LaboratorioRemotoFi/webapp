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
      const groupIndex = state.groups.findIndex(group => {
        return group.id === action.payload.groupId;
      });
      const practiceIndex = state.groups[groupIndex].practices.findIndex(practice => {
        return practice.id === action.payload.reservedSchedule.practiceId;
      });
      return {
        ...state,
        groups: state.groups.map(
          (group, i) => i === groupIndex ? {
            ...group,
            practices: state.groups[groupIndex].practices.map(
              (practice, j) => j === practiceIndex ? {
                ...practice,
                currentStudentSchedule: action.payload.reservedSchedule.timestamp
              }
              : practice
            )
          }
          : group
        )
      };
      /*
      return {
        ...state,
        groups: [
          ...state.groups,
          [groupIndex] = {
            ...state.groups[groupIndex],
            practices: {
              ...state.groups[groupIndex].practices,
              [practiceIndex]: {
                ...state.groups[groupIndex].practices[practiceIndex],
                currentStudentSchedule: action.payload.reservedSchedule.timestamp,
              },
            },
          },
        ],
      };*/
      /* let updatedSchedules = [
        ...state.practices[action.payload.currPracticeId].reservedSchedules,
      ];
        practices: {
          ...state.practices,
          [action.payload.currPracticeId]: {
            ...state.practices[action.payload.currPracticeId],
            currentStudentSchedule: action.payload.reservedSchedule.schedule,
            reservedSchedules: updatedSchedules,
          },
        },

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
      }; */
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
