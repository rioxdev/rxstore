import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/layout/App';
import '@fontsource/roboto/400.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/context/context';
import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const store = configureStore();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);




