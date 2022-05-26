import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './App.scss';

import {
  NODE_ENV,
  BUILD_TARGET,
  BUILD_NAME,
  APP_VERSION,
} from 'src/config/constants';

console.info(`
  TARGET: [ ${BUILD_TARGET} ] on [ ${NODE_ENV} ] environment
  FOR     ${BUILD_NAME}@V${APP_VERSION}
  `);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
