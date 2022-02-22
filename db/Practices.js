const Practices = {
  "1500-1": {
    id: "1500-1",
    name: "Plano inclinado 1",
    practiceNumber: 1,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-01-24T07:00").getTime(),
    endDate: new Date("2022-01-28T18:00").getTime(),
    timeFrame: 45,
    reservedSchedules: [
      { studentId: 0, schedule: new Date("2022-01-25T07:45").getTime() },
      { studentId: 10, schedule: new Date("2022-02-02T08:30").getTime() },
    ],
  },
  "1500-2": {
    id: "1500-2",
    name: "Plano inclinado 2",
    practiceNumber: 2,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-01-31T07:00").getTime(),
    endDate: new Date("2022-02-11T19:00").getTime(),
    timeFrame: 40,
    currentStudentSchedule: NaN,
    reservedSchedules: [
      { studentId: 0, schedule: new Date("2022-01-31T08:20").getTime() },
      { studentId: 1, schedule: new Date("2022-01-31T09:40").getTime() },
      { studentId: 2, schedule: new Date("2022-02-01T07:00").getTime() },
      { studentId: 10, schedule: new Date("2022-02-02T10:20").getTime() },
    ],
  },
  "1500-3": {
    id: "1500-3",
    name: "Plano inclinado 3",
    practiceNumber: 3,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-02-14T07:00").getTime(),
    endDate: new Date("2022-02-18T19:00").getTime(),
    timeFrame: 30,
    currentStudentSchedule: NaN,
    reservedSchedules: [
      { studentId: 10, schedule: new Date("2022-02-14T07:30").getTime() },
    ],
  },
  "1500-4": {
    id: "1500-4",
    name: "Plano inclinado 4",
    practiceNumber: 4,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-02-21T07:00").getTime(),
    endDate: new Date("2022-03-04T19:00").getTime(),
    timeFrame: 50,
    currentStudentSchedule: NaN,
    reservedSchedules: [
      { studentId: 10, schedule: new Date("2022-02-21T08:40").getTime() },
    ],
  },
  "1500-5": {
    id: "1500-5",
    name: "Plano inclinado 5",
    practiceNumber: 5,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-02-28T07:00").getTime(),
    endDate: new Date("2022-03-04T19:00").getTime(),
    timeFrame: 30,
    currentStudentSchedule: NaN,
    reservedSchedules: [
      { studentId: 10, schedule: new Date("2022-02-22T07:30").getTime() },
    ],
  },
  "1501-1": {
    id: "1501-1",
    name: "Fricción 1",
    practiceNumber: 1,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-01-24T07:00").getTime(),
    endDate: new Date("2022-01-28T19:00").getTime(),
    timeFrame: 60,
    currentStudentSchedule: NaN,
    reservedSchedules: [],
  },
  "1501-2": {
    id: "1501-2",
    name: "Fricción 2",
    practiceNumber: 2,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-01-31T07:00").getTime(),
    endDate: new Date("2022-02-04T21:00").getTime(),
    timeFrame: 60,
    currentStudentSchedule: NaN,
    reservedSchedules: [
      { studentId: 0, schedule: new Date("2022-02-04T20:00").getTime() },
    ],
  },
  "1501-3": {
    id: "1501-3",
    name: "Fricción 3",
    practiceNumber: 3,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-02-07T07:00").getTime(),
    endDate: new Date("2022-02-11T19:00").getTime(),
    timeFrame: 60,
    reservedSchedules: [],
  },
  "1502-1": {
    id: "1502-1",
    name: "Caída libre 1",
    practiceNumber: 1,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-01-24T07:00").getTime(),
    endDate: new Date("2022-01-28T18:00").getTime(),
    timeFrame: 60,
    reservedSchedules: [],
  },
  "1502-2": {
    id: "1502-2",
    name: "Caída libre 2",
    practiceNumber: 2,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-01-31T07:00").getTime(),
    endDate: new Date("2022-02-04T21:00").getTime(),
    timeFrame: 50,
    reservedSchedules: [],
  },
  "1502-3": {
    id: "1502-3",
    name: "Caída libre 3",
    practiceNumber: 3,
    raspIp: "256.256.000.000",
    startDate: new Date("2022-02-07T07:00").getTime(),
    endDate: new Date("2022-02-11T22:00").getTime(),
    timeFrame: 60,
    reservedSchedules: [],
  },
};

export default Practices;
