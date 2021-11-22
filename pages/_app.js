import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/config/theme";
import studentsReducer from "../src/hooks/studentsReducer";
import createEmotionCache from "../src/config/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const SessionContext = React.createContext("");
const studentsReducerContext = React.createContext();

export function useSessionContext() {
  return React.useContext(SessionContext);
}
export function useStudentsReducerContext() {
  return React.useContext(SessionContext);
}

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [isAuthenticated, userHasAuthenticated] = React.useState(false);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionContext.Provider
          value={{ isAuthenticated, userHasAuthenticated }}
        >
          <Component {...pageProps} />
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
