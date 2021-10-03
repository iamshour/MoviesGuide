import { StyledEngineProvider } from '@mui/styled-engine';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/resets.scss';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.getElementById('root')
);