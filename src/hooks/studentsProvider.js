import { createContext, useContext, useReducer } from "react";
import studentsReducer, { initialState } from "./studentsReducer";

const StudentsContext = createContext("");

export function useStudentsContext() {
  return useContext(StudentsContext);
}

const StudentsProvider = () => {
  const [studentsState, studentsDispatch] = useReducer(
    studentsReducer,
    initialState
  );

  return [studentsState, studentsDispatch];
};

//const useStore = () => useContext(StoreContext)[0]
//const useDispatch = () => useContext(StoreContext)[1]

export { StudentsContext };
export default StudentsProvider;
