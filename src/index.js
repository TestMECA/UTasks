import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import './App.scss';

import { NODE_ENV, BUILD_TARGET, BUILD_NAME, APP_VERSION } from "src/config/constants"

console.info(`
  TARGET: [ ${BUILD_TARGET} ] on [ ${NODE_ENV} ] environment
  FOR     ${BUILD_NAME}@V${APP_VERSION}
  Project: ${require('./utasks-configuration.json').result.sdkConfig.projectId}
  `);


render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


