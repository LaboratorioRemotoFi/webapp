import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/config/theme";
//import { createContext, useContext, useReducer } from "react";
import createEmotionCache from "../src/config/createEmotionCache";
import { StoreContext } from "../src/hooks/storeContext";
import SessionProvider, { SessionContext } from "../src/hooks/sessionProvider";
import StudentsProvider from "../src/hooks/studentsProvider";
import ProfessorsProvider from "../src/hooks/professorsProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [sessionState, sessionDispatch] = SessionProvider();
  const { isAuthenticated, isStudent } = sessionState;

  const [studentsState, studentsDispatch] = StudentsProvider();
  const [professorsState, professorsDispatch] = ProfessorsProvider();

  let currentState, currentDispatch;

  if (isAuthenticated) {
    currentState = isStudent ? studentsState : professorsState;
    currentDispatch = isStudent ? studentsDispatch : professorsDispatch;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Laboratorio Remoto</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionContext.Provider value={[sessionState, sessionDispatch]}>
          <StoreContext.Provider value={[currentState, currentDispatch]}>
            <Component {...pageProps} />
          </StoreContext.Provider>
        </SessionContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
