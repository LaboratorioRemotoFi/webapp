import { useReducer } from "react";

function sessionReducer(state, action) {
  switch (action.type) {
    case "studentLogin":
      return {
        ...state,
        isAuthenticated: true,
        isStudent: true,
      };
    case "professorLogin":
      return {
        ...state,
        isAuthenticated: true,
        isStudent: false,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        isStudent: false,
      };
  }
}

const initialState = {
  isAuthenticated: false,
  isStudent: false,
};

export { initialState };
export default sessionReducer;
