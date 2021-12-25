/* eslint-disable spellcheck/spell-checker */
/// <reference types="cypress"/>

const UTASKS_URL = Cypress.env('PORTALS_URL')[Cypress.env('TESTING_URL')];

const CUSTOM_THRESHOLDS = {
  performance: 20,
  accessibility: 80,
  'best-practices': 50,
  seo: 40,
  pwa: 15,
};

const DESKTOP_CONFIG = {
  formFactor: 'desktop',
  screenEmulation: {
    width: 1280,
    height: 720,
    deviceScaleRatio: 1,
    mobile: false,
    disable: false,
  },
  throttling: {
    rttMs: 40,
    throughputKbps: 11024,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
};

// Reference: https://github.com/mfrachet/cypress-audit/blob/master/packages/lighthouse/README.md
describe('UTAsKS - Client Performance - Desktop Browser', () => {
  before(() => {
    cy.login();
  });

  context('Checking utasks pages performance', () => {
    [
      {
        testName: 'Audit the profile page',
        url: '',
        needLogin: true,
        checkThePage: () => cy.get('[data-testid=profile]').should('exist'),
      },
      {
        testName: 'Audit the update profile page',
        url: 'update-profile',
        needLogin: true,
        checkThePage: () => cy.get('[data-testid=update-card]').should('exist'),
      },
      {
        testName: 'Audit the home page',
        url: 'home',
        needLogin: true,
        checkThePage: () => cy.get('[data-testid=tasks]').should('exist'),
      },
      {
        testName: 'Audit the sign up page',
        url: 'signup',
        needLogin: false,
        checkThePage: () => cy.get('[data-testid=signup-card]').should('exist'),
      },
      {
        testName: 'Audit the forgot password page',
        url: 'forgot-password',
        needLogin: false,
        checkThePage: () =>
          cy.get('[data-testid=forgot-password]').should('exist'),
      },
    ].forEach((testCase) => {
      it(testCase.testName, () => {
        if (!testCase.needLogin) cy.logout();
        cy.visit(`${UTASKS_URL.UTASKS}${testCase.url}`);
        testCase.checkThePage();

        cy.lighthouse(
          {
            ...CUSTOM_THRESHOLDS,
            'first-contentful-paint': 10000,
            'largest-contentful-paint': 10000,
            'cumulative-layout-shift': 0.2,
            'total-blocking-time': 1000,
          },
          DESKTOP_CONFIG
        );

        //cy.pa11y();
      });
    });
  }); // End of Context - Checking utasks pages performance
}); // End of Describe - UTAsKS - Client Performance - Desktop Browser
