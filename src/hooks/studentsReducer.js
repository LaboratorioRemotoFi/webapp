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
  practices: {
    "1500-1": {
      id: "1500-1",
      ip: "256.256.000.000",
      name: "Plano inclinado 1",
      day: ["05-01-2021","05-01-2021","05-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],

    },
    "1500-2": {
      id: "1500-2",
      ip: "256.256.000.000",
      name: "Plano inclinado 2",
      day: ["06-01-2021","06-01-2021","06-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1500-3": {
      id: "1500-3",
      ip: "256.256.000.000",
      name: "Plano inclinado 3",
      day: ["07-01-2021","07-01-2021","07-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1501-1": {
      id: "1501-1",
      ip: "256.256.000.000",
      name: "Fricción 1",
      day: ["08-01-2021","08-01-2021","08-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1501-2": {
      id: "1501-2",
      ip: "256.256.000.000",
      name: "Fricción 2",
      day: ["09-01-2021","09-01-2021","09-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1501-3": {
      id: "1501-3",
      ip: "256.256.000.000",
      name: "Fricción 3",
      day: ["10-01-2021","10-01-2021","10-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1502-1": {
      id: "1502-1",
      ip: "256.256.000.000",
      name: "Caída libre 1",
      day: ["11-01-2021","11-01-2021","11-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1502-2": {
      id: "1502-2",
      ip: "256.256.000.000",
      name: "Caída libre 2",
      day: ["12-01-2021","12-01-2021","12-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
    "1502-3": {
      id: "1502-3",
      ip: "256.256.000.000",
      name: "Caída libre 3",
      day: ["13-01-2021","13-01-2021","13-01-2021"],
      startDate: ["7:00","8:00","9:00"],
      dueDate: ["9:00","10:00","11:00"],
    },
  },
};

/*const usersReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [state, dispatch];
}*/

export { initialState };
export default studentsReducer;
