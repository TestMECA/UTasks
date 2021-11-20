import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';

import { NODE_ENV, BUILD_TARGET, BUILD_NAME, APP_VERSION } from "src/constants/constants"

console.info(`
  TARGET: [ ${BUILD_TARGET} ] on [ ${NODE_ENV} ] environment
  FOR     ${BUILD_NAME}@V${APP_VERSION}
  `);


render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


