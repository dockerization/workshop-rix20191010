import React from 'react';
import ReactDom from 'react-dom';
import VendingMachine from './components/VendingMachine.jsx';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <VendingMachine />
  </Provider>,
  document.getElementById('main')
);
