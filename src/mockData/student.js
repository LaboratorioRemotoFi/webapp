const studentMockData = {
  user: {
    id: 0,
    type: "student", //student - professor
    email: "abc@gmail.com",
    name: "Alex",
    groupsIds: ["2021-2_1500_2", "2021-2_1501_3", "2021-2_1502_1"],
    //reservedSchedules: [
    //  { practiceId: 1500, day: [2022, 1, 8], time: [10, 0] },
    //],
  },
  subjects: {
    1500: {
      id: 1500,
      name: "Mecánica",
      practicesIds: ["1500-1", "1500-2", "1500-3"],
    },
    1501: {
      id: 1501,
      name: "Cinemática",
      practicesIds: ["1501-1", "1501-2", "1501-3"],
    },
    1502: {
      id: 1502,
      name: "Dinámica",
      practicesIds: ["1502-1", "1502-2", "1502-3"],
    },
  },
  groups: {
    "2021-2_1500_2": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1500,
      groupNumber: 2,
    },
    "2021-2_1501_3": {
      id: "2021-2_1501_3",
      semester: "2021-2",
      subjectId: 1501,
      groupNumber: 3,
    },
    "2021-2_1502_1": {
      id: "2021-2_1502_1",
      semester: "2021-2",
      subjectId: 1502,
      groupNumber: 1,
    },
  },
  practices: {
    "1500-1": {
      id: "1500-1",
      name: "Plano inclinado 1",
      practiceNumber: 1,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-07T07:00").getTime(),
      endDate: new Date("2022-02-11T18:00").getTime(),
      timeFrame: 40, // Minutes
      currentStudentSchedule: "",
      reservedSchedules: [
        // Another option (put student id here and remove "reservedSchedules" from user object):
        //[1, 2022, 1, 8, 10, 0] // -> [studentId, year, month, day, hour, minute]
        //[2022, 1, 8, 10, 0],
        { studentId: 0, schedule: new Date("2022-02-08T07:00").getTime() },
      ],
    },
    "1500-2": {
      id: "1500-2",
      name: "Plano inclinado 2",
      practiceNumber: 2,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-14T07:00").getTime(),
      endDate: new Date("2022-02-18T19:00").getTime(),
      timeFrame: 45,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
        { studentId: 10, schedule: new Date("2022-02-14T07:45").getTime() },
      ],
    },
    "1500-3": {
      id: "1500-3",
      name: "Plano inclinado 3",
      practiceNumber: 3,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-21T07:00").getTime(),
      endDate: new Date("2022-02-25T19:00").getTime(),
      timeFrame: 45,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1501-1": {
      id: "1501-1",
      name: "Fricción 1",
      practiceNumber: 1,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-07T07:00").getTime(),
      endDate: new Date("2022-02-11T19:00").getTime(),
      timeFrame: 60,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1501-2": {
      id: "1501-2",
      name: "Fricción 2",
      practiceNumber: 2,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-14T07:00").getTime(),
      endDate: new Date("2022-02-18T19:00").getTime(),
      timeFrame: 60,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1501-3": {
      id: "1501-3",
      name: "Fricción 3",
      practiceNumber: 3,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-21T07:00").getTime(),
      endDate: new Date("2022-02-25T19:00").getTime(),
      timeFrame: 60,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1502-1": {
      id: "1502-1",
      name: "Caída libre 1",
      practiceNumber: 1,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-07T07:00").getTime(),
      endDate: new Date("2022-02-11T19:00").getTime(),
      timeFrame: 60,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1502-2": {
      id: "1502-2",
      name: "Caída libre 2",
      practiceNumber: 2,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-14T07:00").getTime(),
      endDate: new Date("2022-02-18T19:00").getTime(),
      timeFrame: 50,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1502-3": {
      id: "1502-3",
      name: "Caída libre 3",
      practiceNumber: 3,
      raspIp: "256.256.000.000",
      startDate: new Date("2022-02-21T07:00").getTime(),
      endDate: new Date("2022-02-25T19:00").getTime(),
      timeFrame: 60,
      currentStudentSchedule: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
  },
};

export default studentMockData;
