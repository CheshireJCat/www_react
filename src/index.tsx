import React from 'react';
import { render } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "animate.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles, Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import "normalize.css/normalize.css"
import { Provider } from 'react-redux';
import store from "@/store"

const theme = createTheme({
  palette: {
    primary: {
      main: "#feed3f",
      light: "#ffea00",
      dark: "#c7b800"
    },
    secondary: {
      main: "#4caf50",
      light: "#80e27e",
      dark: "087f23"
    },
    text: {
      primary: "#000000",
      secondary: "#ffebee"
    }
  }
})

const globalStyles = <GlobalStyles styles={createStyles((theme: Theme) => ({
  body: {
    backgroundColor: theme.palette.primary.main,
  },
  "body.sbgc": {
    backgroundColor: theme.palette.secondary.main,
  },
  a: {
    color: theme.palette.secondary.main,
    ":visited,:link": {
      color: theme.palette.secondary.main
    },
    ":hover,:active": {
      color: theme.palette.secondary.light
    }
  },
  '.page .markdown-body a': {
    color: theme.palette.primary.main
  }
}))} />

const rootElement = document.getElementById('root');

const Root = () => (<React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {globalStyles}
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
</React.StrictMode>)

// if (rootElement?.hasChildNodes()) {
//   hydrate(<Root />, rootElement);
// } else {

// }
render(<Root />, rootElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
