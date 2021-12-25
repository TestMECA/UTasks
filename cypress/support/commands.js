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

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../src/firebase';

Cypress.Commands.add('login', (userCredentials = {}) => {
  const DEFAULT_ACCOUNT = Cypress.env('TESTING_ACCOUNTS').UTASKS_USER;
  if (!userCredentials || !userCredentials.userName)
    userCredentials.userName = DEFAULT_ACCOUNT.USERNAME;
  if (!userCredentials || !userCredentials.password)
    userCredentials.password = DEFAULT_ACCOUNT.PASSWORD;

  return signInWithEmailAndPassword(
    auth,
    userCredentials.userName,
    userCredentials.password
  );
});

Cypress.Commands.add('logout', () => {
  return signOut(auth);
});
