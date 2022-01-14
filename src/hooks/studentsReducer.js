import { useReducer } from "react";

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "studentLogin":
    /*{return {
       ...state,
       isAuthenticated: true,
       user: action.payload.user,
       password: action.payload.password
     }  }*/
    case "professorLogin":
    // stuff
    case "Logout":
    // stuff
    default:
      return state;
  }
};

const initialState = {
  user: {
    id: 0,
    type: "student", //student - professor
    email: "abc@gmail.com",
    name: "Alex",
    groupsIds: [
      "2021-2_1500_2",
      "2021-2_1501_3",
      "2021-2_1502_1"
    ],
  },
  groups: {
    "2021-2_1500_2": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1500,
      groupNumber: 2,
    },
    "2021-2_1501_3": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1501,
      groupNumber: 3,
    },
    "2021-2_1502_1": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1502,
      groupNumber: 1,
    },
  },
  subjects: {
    1500: {
      id: 1500,
      name: "mecanica",
      practicesIds: ["1500-1", "1500-2", "1500-3"],
    },
    1501: {
      id: 1501,
      name: "cinematica",
      practicesIds: ["1501-1", "1501-2", "1501-3"],
    },
    1502: {
      id: 1502,
      name: "dinamica",
      practicesIds: ["1502-1", "1502-2", "1502-3"],
    },
  },
  practices: [
    {
      id: "1500-1",
      ip: "256.256.000.000",
      name: "Plano inclinado 1",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-01-05", // aaaa-mm-dd
          time: "7:00 - 9:00",
        },
        {
          scheduleId: "1",
          day: "2022-01-05",
          time: "9:00 - 11:00",
        },
      ],
    },
    {
      id: "1500-2",
      ip: "256.256.000.000",
      name: "Plano inclinado 2",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-02-15",
          time: "9:00 - 11:00",
        },
        {
          scheduleId: "1",
          day: "2022-02-15",
          time: "13:00 - 15:00",
        },
      ],
    },
    {
      id: "1500-3",
      ip: "256.256.000.000",
      name: "Plano inclinado 3",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-03-11",
          time: "7:00 - 9:00",
        },
        {
          scheduleId: "1",
          day: "2022-03-11",
          time: "17:00 - 19:00",
        },
      ],
    },
    {
      id: "1501-1",
      ip: "256.256.000.000",
      name: "Fricción 1",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-01-14",
          time: "15:00 - 17:00",
        },
        {
          scheduleId: "1",
          day: "2022-01-14",
          time: "17:00 - 19:00",
        },
      ],
    },
    {
      id: "1501-2",
      ip: "256.256.000.000",
      name: "Fricción 2",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-01-15",
          time: "7:00 - 9:00",
        },
        {
          scheduleId: "1",
          day: "2022-01-15",
          time: "19:00 - 21:00",
        },
      ],
    },
    {
      id: "1501-3",
      ip: "256.256.000.000",
      name: "Fricción 3",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-01-20",
          time: "9:00 - 11:00",
        },
        {
          scheduleId: "1",
          day: "2022-01-20",
          time: "11:00 - 13:00",
        },
      ],
    },
    {
      id: "1502-1",
      ip: "256.256.000.000",
      name: "Caída libre 1",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-05-05",
          time: "13:00 - 15:00",
        },
        {
          scheduleId: "1",
          day: "2022-05-05",
          time: "15:00 - 17:00",
        },
      ],
    },
    {
      id: "1502-2",
      ip: "256.256.000.000",
      name: "Caída libre 2",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-05-25",
          time: "7:00 - 9:00",
        },
        {
          scheduleId: "1",
          day: "2022-05-25",
          time: "17:00 - 19:00",
        },
      ],
    },
    {
      id: "1502-3",
      ip: "256.256.000.000",
      name: "Caída libre 3",
      schedules: [
        {
          scheduleId: "0",
          day: "2022-06-05",
          time: "17:00 - 19:00",
        },
        {
          scheduleId: "1",
          day: "2022-06-05",
          time: "19:00 - 21:00",
        },
      ],
    },
  ],
};

/*const usersReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [state, dispatch];
}*/

export { initialState };
export default studentsReducer;
