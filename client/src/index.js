import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';
import history from './history';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>,
  rootElement
);