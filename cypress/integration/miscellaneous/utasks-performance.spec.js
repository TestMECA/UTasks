/// <reference types="cypress"/>
import { OrdersList } from "../../../pages/doctor-portal/list-orders-page";
import { FAILED_GETTING_ORDERS } from "../../../../src/services/error/constants.js";

const ordersList = new OrdersList();
const AZURE_API = Cypress.env('APIS').AZURE;
const PORTALS_URL = Cypress.env("PORTALS_URL").LOCAL;


describe("Doctor Portal - Global error handling", () => {
  before(() => {
    cy.getAccessToken().then((res) => {
      Cypress.env("userAccessToken", res.body.AuthenticationResult.AccessToken);
      cy.setCookie("at", Cypress.env("userAccessToken"));
    });
  });

  context("Checking internet drop , session expiration, not technical message displayed", () => {

    beforeEach(() => {
      cy.setCookie("at", Cypress.env("userAccessToken"));

      cy.visit(PORTALS_URL.DOCTOR);

      cy.intercept({
        method: "GET",
        url: "/api/v2/doctor-auth",
        hostname: AZURE_API.HOST_NAME,
      },
        { fixture: "doctor-portal/doctor-auth.json" }
      ).as("doctor-auth");

    });

    it.skip("TR0558 - Verify that a toast message shows up on internet disconnection while calling an API endpoint", () => {

      cy.wait("@doctor-auth", { timeout: 10000 }).then(() => {
        ordersList.getOrderCardByIndex(0).card().then(() => {
          cy.goOffLine(true);
          cy.wrap(window).its('navigator.onLine').should('be.false');

          ordersList.navBar.tabs.settings().click();
          ordersList.toastMessages.message().should("contain.text", "You are currently offline");

          cy.goOffLine(false);
          cy.wrap(window).its('navigator.onLine').should('be.true');

        });
      });
    });

    it("TR0562 - Verify that a toast message shows up if the session expires (AWS Cognito API)", () => {

      cy.wait("@doctor-auth", { timeout: 10000 }).then(() => {

        cy.intercept({
          method: "GET",
          url: "/api/v2/Practice-users",
          hostname: AZURE_API.HOST_NAME,
        },
          {
            statusCode: 401,
          }
        ).as("Practice-users");

        ordersList.navBar.tabs.settings().click();
        cy.url({ timeout: 10000 }).should("include", `${PORTALS_URL.IDENTITY}login?redirect_uri=`);
      });
    });

    it("TR0576 - Verify that the user should be redirected to login page upon refresh token expiration", () => {
      cy.wait("@doctor-auth", { timeout: 10000 }).then(() => {

        cy.intercept({
          method: "GET",
          url: "/api/v2/Practice-users",
          hostname: AZURE_API.HOST_NAME,
        },
          {
            statusCode: 400,
            delay: 500,
            body: { message: "refresh token has been revoked" }
          }
        ).as("Practice-users");

        ordersList.navBar.tabs.settings().click();
        cy.url({ timeout: 10000 }).should("include", `${PORTALS_URL.IDENTITY}login?redirect_uri=`);
      });

    });

    it("TR0563 - Verify that the user is redirected to the 404 page if the user is accessing a forbidden area", () => {
      cy.wait("@doctor-auth", { timeout: 10000 }).then(() => {

        cy.intercept({
          method: "GET",
          url: "/api/v2/Practice-users",
          hostname: AZURE_API.HOST_NAME,
        },
          {
            statusCode: 403,
          }
        ).as("Practice-users");

        ordersList.navBar.tabs.settings().click();

        cy.url({ timeout: 10000 }).should("include", `${PORTALS_URL.IDENTITY}not-found`);
      });
    });

    it("TR0574 - Verify that no technical message shows up in the entire application", () => {
      cy.wait("@doctor-auth", { timeout: 10000 }).then(() => {

        cy.intercept({
          method: "POST",
          url: "/api/v2/doctor-orders",
          hostname: AZURE_API.HOST_NAME,
        },
          {
            statusCode: 500,
            body: {}
          }
        ).as("doctor-orders");
        cy.wait("@doctor-orders", { timeout: 10000 }).then(() => {
          ordersList.toastMessages.message().should("contain.text", FAILED_GETTING_ORDERS);
        });
      });

    });

  }); // End of Context - Checking internet drop , session expiration, not technical message displayed
}); // End of Describe - Doctor Portal - Global error handling
