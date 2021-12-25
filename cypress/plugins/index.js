/* eslint-disable spellcheck/spell-checker */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const injectCodeCoverage = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  injectCodeCoverage(on, config);
  // this line instruments spec files and loaded unit test code (tested by cypress)
  //on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))

  return config;
};
