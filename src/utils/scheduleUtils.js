import convertDateToSpanishString from "../utils/timeUtils";

let currDate = Date.now();

function getDaySchedules(day, noAvailSchedPerDay, timeFrame) {
  let scheduleList = [];

  let temp = new Date(day).getTime();

  for (let j = 1; j < noAvailSchedPerDay; j++) {
    scheduleList.push(temp);
    temp = temp + timeFrame * (1000 * 60);
  }
  scheduleList.push(temp);

  return scheduleList;
}

function scheduleIsNotAvailable(
  scheduleToValidate,
  scheduleList,
  currPractice
) {
  let disable = !scheduleList
    .filter(
      (schedule) =>
        // Only enable schedule if its end time has not yet come
        schedule + (currPractice.timeFrame - 1) * 60 * 1000 > currDate &&
        // If the schedule isn't on the reserved schedules array
        // then enable it
        !currPractice.reservedSchedules.find(function (
          scheduleReserved,
          index
        ) {
          if (scheduleReserved == schedule) return true;
        })
    )
    .includes(scheduleToValidate);
  return disable;
}

function getNearestPractice(groups) {
  console.log("GET NEAREST PRACTICE");
  console.log(groups);
  return groups
    .map((group) =>
      group.practices.map((practice) =>
        practice.currentStudentSchedule
          ? {
              name: practice.name,
              practiceNumber: practice.practiceNumber,
              ip: practice.raspIp,
              subjectId: group.subjectId,
              groupName: group.name,
              dateString: convertDateToSpanishString(
                practice.currentStudentSchedule
              ),
              startTime: practice.currentStudentSchedule,
              endTime:
                practice.currentStudentSchedule +
                practice.timeFrame * 60 * 1000,
            }
          : null
      )
    )
    .flat()
    .filter((s) => s)
    .find(
      (schedule) =>
        Date.now() > schedule.startTime && Date.now() < schedule.endTime
    );
}

export { getDaySchedules, scheduleIsNotAvailable, getNearestPractice };
