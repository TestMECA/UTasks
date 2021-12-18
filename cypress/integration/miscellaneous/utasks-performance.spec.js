/// <reference types="cypress"/>

const UTASKS_URL = Cypress.env("PORTALS_URL").LOCAL;


describe("UTAsKS - Client Performance", () => {
  before(() => {
    cy.login()
  });

  context("Checking utasks pages performance", () => {

    beforeEach(() => {
      cy.visit(UTASKS_URL.UTASKS);
    });

    it("Test home", () => {
      cy.visit(`${UTASKS_URL.UTASKS}home`);
    });


    it("Test home2", () => {
      cy.visit(`${UTASKS_URL.UTASKS}home`);
    });

  }); // End of Context - Checking utasks pages performance
}); // End of Describe - UTAsKS - Client Performance
