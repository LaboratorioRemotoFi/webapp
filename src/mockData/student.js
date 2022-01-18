const studentMockData = {
  user: {
    id: 0,
    type: "student", //student - professor
    email: "abc@gmail.com",
    name: "Alex",
    groupsIds: ["2021-2_1500_2", "2021-2_1501_3", "2021-2_1502_1"],
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
      startDate: "2022-02-07",
      endDate: "2022-02-19",
      startTime: "07:00",
      endTime: "17:00",
      timeFrame: "01:00",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1500-2": {
      id: "1500-2",
      name: "Plano inclinado 2",
      practiceNumber: 2,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1500-3": {
      id: "1500-3",
      name: "Plano inclinado 3",
      practiceNumber: 3,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1501-1": {
      id: "1501-1",
      name: "Fricción 1",
      practiceNumber: 1,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1501-2": {
      id: "1501-2",
      name: "Fricción 2",
      practiceNumber: 2,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1501-3": {
      id: "1501-3",
      name: "Fricción 3",
      practiceNumber: 3,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1502-1": {
      id: "1502-1",
      name: "Caída libre 1",
      practiceNumber: 1,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1502-2": {
      id: "1502-2",
      name: "Caída libre 2",
      practiceNumber: 2,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
    "1502-3": {
      id: "1502-3",
      name: "Caída libre 3",
      practiceNumber: 3,
      raspIp: "256.256.000.000",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      timeFrame: "",
      reservedSchedules: [
        // Reserved start times and days
      ],
    },
  },
};

export default studentMockData;
