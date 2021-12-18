// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

import { signInWithEmailAndPassword, signOut } from "firebase/auth";


import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../src/firebase"


Cypress.Commands.add('login', (userCredentials = {}) => {
  const DEFAULT_ACCOUNT = Cypress.env('TESTING_ACCOUNTS').UTASKS_USER1;

  if (!userCredentials || !userCredentials.userName)
    userCredentials.userName = DEFAULT_ACCOUNT.USERNAME;
  if (!userCredentials || !userCredentials.password)
    userCredentials.password = DEFAULT_ACCOUNT.PASSWORD;

  signInWithEmailAndPassword(auth, userCredentials.userName, userCredentials.password).then(() => {
    cy.log("Signed in  successful.")
  }).catch(e => {
    cy.log("Failed to sign in - ", e)
  });

});

Cypress.Commands.add('logout', () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.")
  }).catch(e => {
    console.log("Failed to logout - ", e)
  });

});


// Go offline or get back online
Cypress.Commands.add('goOffLine', (goOffline = true) => {
  if (goOffline)
    cy.log('**We are going offline**');
  else
    cy.log('**We are getting back online**');

  Cypress.automation('remote:debugger:protocol',
    {
      command: 'Network.enable',
    }).then(() => {
      return Cypress.automation('remote:debugger:protocol',
        {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: goOffline,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        });
    });
});
