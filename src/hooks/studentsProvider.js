import { createContext, useContext, useReducer } from "react";
import studentsReducer, { initialState } from "./studentsReducer";

const StudentsContext = createContext();

const StudentsProvider = ({ children }) => {
  const [studentsState, studentsDispatch] = useReducer(
    studentsReducer,
    initialState
  );

  return (
    <StudentsContext.Provider value={[studentsState, studentsDispatch]}>
      {children}
    </StudentsContext.Provider>
  );
};

//const useStore = () => useContext(StoreContext)[0]
//const useDispatch = () => useContext(StoreContext)[1]

export { StudentsContext };
export default StudentsProvider;
