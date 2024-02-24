import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';

import store from './store.js';
import { Provider } from 'react-redux';

const theme  = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4cd0e6',
    },
    secondary: {
      main: '#ffd600',
    },
    background: {
      default: '#eeeeee',
    },
    dark : {
      default : '#212121'
    }
    
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
