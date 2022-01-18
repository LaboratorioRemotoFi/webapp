const professorMockData = {
  user: {
    id: 100,
    type: "professor",
    email: "xyz@gmail.com",
    //password: '1234',
    name: "Tom Schmoe",
    groupIds: ["20212-1500-1", "20212-1500-2"],
  },
  subjects: {
    1500: {
      id: 1500,
      name: "Mecánica",
      practiceIds: ["1500-1", "1500-2", "1500-3"],
    },
  },
  groups: {
    "2021-2_1500_1": {
      id: "2021-2_1500_1",
      semester: "2021-2",
      subjectId: 1500,
      groupNumber: 1,
      studentIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      /* schedule: {
        days: ["Lun", "Mie"],
        hour: "07:00 a 08:30",
      }, */
    },
    "2021-2_1500_2": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1500,
      groupNumber: 2,
      studentIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      /* schedule: {
        days: ["Mie", "Vie"],
        hour: "09:00 a 10:30",
      }, */
    },
  },
  practices: {
    "1500-1": {
      id: "1500-1",
      name: "Práctica 1",
      practiceNumber: 1,
      raspIp: "192.0.2.1",
    },
    "1500-2": {
      id: "1500-2",
      name: "Práctica 2",
      practiceNumber: 2,
      raspIp: "192.0.2.2",
    },
    "1500-3": {
      id: "1500-3",
      name: "Práctica 3",
      practiceNumber: 3,
      raspIp: "192.0.2.3",
    },
  },
};

export default professorMockData;
