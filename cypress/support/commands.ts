/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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

// declare global {
//   namespace Cypress {
//     interface Chainable {}
//   }
// }

Cypress.Commands.add("initializeTestEnvironment", () => {
  cy.visit("http://localhost:5173/");
  cy.viewport(1536, 960);
});

Cypress.Commands.add("openForm", () => {
  cy.get(".gnb__button").click();
});

Cypress.Commands.add("fillForm", (formData) => {
  const fieldSelectors = {
    category: `select[name="category"]`,
    name: `input[name="name"]`,
    distance: `select[name="distance"]`,
    description: `textarea[name="description"]`,
    link: `input[name="link"]`,
  };

  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      const selector = fieldSelectors[key];
      cy.get(selector).should("be.visible");

      if (key === "category" || key === "distance") {
        cy.get(selector).select(value).should("have.value", value);
      } else {
        cy.get(selector).type(value).should("have.value", value);
      }
    }
  });
});

Cypress.Commands.add("clickAddButton", () => {
  cy.contains("button", "추가하기").should("exist").and("be.visible").click();
});

export {};
