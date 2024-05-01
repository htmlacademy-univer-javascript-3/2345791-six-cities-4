import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import store from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { Provider } from 'react-redux';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
