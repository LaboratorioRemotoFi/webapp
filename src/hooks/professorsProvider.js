import { createContext, useContext, useReducer } from "react";
import professorsReducer, { initialState } from "./professorsReducer";

const ProfessorsContext = createContext("");

export function useProfessorsContext() {
  return useContext(ProfessorsContext);
}

const ProfessorsProvider = () => {
  const [professorsState, professorsDispatch] = useReducer(
    professorsReducer,
    initialState
  );

  return [professorsState, professorsDispatch];
};

export { ProfessorsContext };
export default ProfessorsProvider;
