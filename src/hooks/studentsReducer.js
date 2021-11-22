
import React from "react";
import usersMockData from '../mockData/user.js';


const reducer = (state, action) => {
	switch (action.type) {
		case 'studentLogin':
     /*{return {
       ...state,
       isAuthenticated: true,
       user: action.payload.user,
       password: action.payload.password
     }  }*/
    case 'professorLogin':
		// stuff
		case 'Logout':
		// stuff
	}
}

const initialState = {
	user: {
    id:0,
    type:'student', //student - professor
    email:'abc@gmail.com',
    name:'Alex',
    groupsIds: [
      '2021-2_1500_2',
    ]
  },
  groups: {
    '2021-2_1500_2': {
      id:'2021-2_1500_2',
      semester:'2021-2',
      subjectId: 1500,
      groupId:2,
      groupNumber:1,
    }
  },
  subjects: {
    '1500': {
      id: 1500,
      name:'mecanica',
      practicesIds: [
        '1500-1',
        '1500-2',
        '1500-3',
      ]
    }
  },
  practices: {
    '1500-1': {
      ip:'256.256.000.000',
      name: 'Plano inclinado',
    }
  }
};

const usersReducer = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return [state, dispatch];
}

export default usersReducer;



