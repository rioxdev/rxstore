import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/layout/App';
import '@fontsource/roboto/400.css';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/context/context';
// import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
import { fetchProductsAsync } from './features/catalogs/catalogSlice';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


// const store = configureStore();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);




