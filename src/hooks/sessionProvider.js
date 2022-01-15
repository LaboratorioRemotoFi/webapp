import { createContext, useContext, useReducer } from "react";
import sessionReducer, { initialState } from "./sessionReducer";

const SessionContext = createContext("");

export function useSessionContext() {
  return useContext(SessionContext);
}

const SessionProvider = () => {
  const [sessionState, sessionDispatch] = useReducer(
    sessionReducer,
    initialState
  );

  return [sessionState, sessionDispatch];
};

export { SessionContext };
export default SessionProvider;
