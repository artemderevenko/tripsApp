import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './firebase';

import { App } from './components/App';
import './index.sass';
import store from './store';
import { NotifyProvider } from './hoc/NotifyProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </BrowserRouter>
  </Provider>
);
