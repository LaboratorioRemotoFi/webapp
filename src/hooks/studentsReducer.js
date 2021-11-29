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
  }
};

const initialState = {
  user: {
    id: 0,
    type: "student", //student - professor
    email: "abc@gmail.com",
    name: "Alex",
    groupsIds: ["2021-2_1500_2"],
  },
  groups: {
    "2021-2_1500_2": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1500,
      groupId: 2,
      groupNumber: 1,
    },
    "2021-2_1501_3": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1501,
      groupId: 3,
      groupNumber: 1,
    },
    "2021-2_1502_1": {
      id: "2021-2_1500_2",
      semester: "2021-2",
      subjectId: 1502,
      groupId: 1,
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
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1500-2": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1500-3": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1501-1": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1501-2": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1501-3": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1502-1": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1502-2": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
    "1502-3": {
      ip: "256.256.000.000",
      name: "Plano inclinado",
    },
  },
};

/*const usersReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return [state, dispatch];
}*/

export { initialState };
export default studentsReducer;
