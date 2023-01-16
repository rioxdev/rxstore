import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/layout/App';
import '@fontsource/roboto/400.css';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);




