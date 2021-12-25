/* eslint-disable spellcheck/spell-checker */
/// <reference types="cypress"/>

const UTASKS_URL = Cypress.env('PORTALS_URL')[Cypress.env('TESTING_URL')];

describe('UTAsKS - Client Performance', () => {
  before(() => {
    cy.login();
  });

  context('Checking utasks pages performance', () => {
    it('Test home', () => {
      cy.visit(`${UTASKS_URL.UTASKS}home`);
      cy.get('[data-testid=tasks]').should('exist');
    });

    it('Test home2', () => {
      cy.visit(`${UTASKS_URL.UTASKS}home`);
      cy.get('[data-testid=tasks]').should('exist');
    });

    it('Test home3', () => {
      cy.visit(`${UTASKS_URL.UTASKS}update-profile`);
      cy.get('[data-testid=update-card]').should('exist');
    });

    it('Test home4', () => {
      cy.visit(`${UTASKS_URL.UTASKS}`);
      cy.get('[data-testid=profile]').should('exist');
      cy.logout();
    });

    it('Test home5', () => {
      cy.visit(`${UTASKS_URL.UTASKS}`);
      cy.get('[data-testid=login-card]').should('exist');
    });
  }); // End of Context - Checking utasks pages performance
}); // End of Describe - UTAsKS - Client Performance
