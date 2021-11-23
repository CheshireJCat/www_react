import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles, Theme } from '@mui/material';
import { createStyles } from '@mui/styles';
import "normalize.css/normalize.css"

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
    fontSize: 16
  },
  a: {
    color: theme.palette.primary.main,
    ":visited,:link": {
      color: theme.palette.primary.main
    },
    ":hover,:active": {
      color: theme.palette.secondary.light
    }
  },
  '.markdown-body a': {
    color: theme.palette.primary.main
  }
}))} />


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
