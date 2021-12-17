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

Cypress.Commands.add('getAccessToken', (userCredentials = {}) => {
  const COGNITO_API = Cypress.env('APIS').COGNITO;
  const DEFAULT_ACCOUNT = Cypress.env('TESTING_ACCOUNTS').DOCTOR_USER_1;

  if (!userCredentials || !userCredentials.userName)
    userCredentials.userName = DEFAULT_ACCOUNT.USERNAME;
  if (!userCredentials || !userCredentials.password)
    userCredentials.password = DEFAULT_ACCOUNT.PASSWORD;

  return cy.request({
    method: 'POST',
    url: `https://${COGNITO_API.HOST_NAME}/`,
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    },
    body: {
      AuthParameters: {
        USERNAME: userCredentials.userName,
        PASSWORD: userCredentials.password,
      },
      AuthFlow: COGNITO_API.AUTH_FLOW,
      ClientId: COGNITO_API.CLIENT_ID,
    },
  });
});

Cypress.Commands.add('changePassword', (userCredentials = {}) => {
  const COGNITO_API = Cypress.env('APIS').COGNITO;
  const DEFAULT_ACCOUNT = Cypress.env('TESTING_ACCOUNTS').DOCTOR_USER_1;

  if (!userCredentials.previousPassword)
    userCredentials.previousPassword = DEFAULT_ACCOUNT.PASSWORD;
  if (!userCredentials.proposedPassword)
    userCredentials.proposedPassword = DEFAULT_ACCOUNT.PASSWORD;

  //If you didn't provide a access token , i will get it form the cookies
  if (!userCredentials.accessToken)
    cy.getCookie('at')
      .should('exist')
      .then((cookie) => {
        userCredentials.accessToken = cookie.value;
        cy.request({
          method: 'POST',
          url: `https://${COGNITO_API.HOST_NAME}/`,
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.ChangePassword',
          },
          body: {
            AccessToken: userCredentials.accessToken,
            PreviousPassword: userCredentials.previousPassword,
            ProposedPassword: userCredentials.proposedPassword,
          },
        });
      });
  else
    cy.request({
      method: 'POST',
      url: `https://${COGNITO_API.HOST_NAME}/`,
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.ChangePassword',
      },
      body: {
        AccessToken: userCredentials.accessToken,
        PreviousPassword: userCredentials.previousPassword,
        ProposedPassword: userCredentials.proposedPassword,
      },
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
