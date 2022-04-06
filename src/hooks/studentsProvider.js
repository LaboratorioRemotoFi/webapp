import { createContext, useContext, useReducer } from "react";
import studentsReducer from "./studentsReducer";

const StudentsContext = createContext("");

export function useStudentsContext() {
  return useContext(StudentsContext);
}

const StudentsProvider = () => {
  const [studentsState, studentsDispatch] = useReducer(studentsReducer, {});

  return [studentsState, studentsDispatch];
};

export { StudentsContext };
export default StudentsProvider;
